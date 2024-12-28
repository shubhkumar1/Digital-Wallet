const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const { type } = require('os');
const { timeStamp } = require('console');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
	.connect('mongodb://localhost:27017/user', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

	const userSchema = new mongoose.Schema({
		name: { type: String, required: true},
		mail: { type: String, required: true, unique: true},
		password: { type: String, required: true},
		upiID: { type: String, unique: true },
		balance: { type: Number }
	});

	const User = mongoose.model("User", userSchema);

	const transactionSchema = new mongoose.Schema({
		senderUpiId: {type: String, required: true},
		receiverUpiId: {type: String, required: true},
		amount: {type: Number, required: true},
	}, {timeStamp: true});

	const Transaction = mongoose.model("Transaction", transactionSchema);

	const generateUPI = () =>{
		const randomID = crypto.randomBytes(4).toString("hex");
		return `${randomID}@rupay`;
	};

	// Signup Route
	app.post('/api/signup', async (req, res) => {
		try {
			const {name, mail, password} = req.body;

			// Check if user already exist
			let user = await User.findOne({mail});
			if(user){
				return res.status(400).send({message: "User already exist"});
			}

			// Generate UPI ID
			const upiID = generateUPI();
			const balance = 1000;

			// Create new user
			user = new User({name, mail, password, upiID, balance});
			await user.save;
			res.status(201).send({message: "User registered successfully"});
		} catch(err){
			res.status(500).send({message: "Server error"});
		}
	});

	// Fetch User Details Route
	app.get('/api/user/:upiID', async(req, res) => {
		try {
			const {upiID} = req.params;
			const user = await User.findOne({upiID});

			if(!User){
				return res.status(404).send({message: "User not found"});
			}

			res.status(200).send(user);
		} catch(err){
			console.error("Error fetching user:", err);
			res.status(500).send({message: "Server error"});
		}
	});

	// Login Route
	app.post('/api/login', async(req, res) => {
		try{
			const {mail, password} = req.body;

			// Find user by mail
			const user = await User.findOne({mail});
			if(!user || user.password !== password){
				return res.status(500).send({message: "Invalid Login details"});
			}

			res.status(200).send({
				message: "Login successfully",
				upiID: user.upiID,
				balance: user.balance
			});
		} catch(err){
			console.error(err);
			res.status(500).send({message: "Server error"});
		}
	});

	// Transaction Route
	app.post('/api/transaction', async(req, res) => {
		try {
			const {senderUpiId, receiverUpiId, amount} = req.body;

			// Validate amount
			if(amount <= 0){
				return res.status(400).send({message: "Invalid amount"});
			}

			const sender = await User.findOne({upiID: senderUpiId});
			const receiver = await User.findOne({upiID: receiverUpiId});

			if(!sender){
				res.status(404).send({message: "Sender not found"});
			}
			if(!receiver){
				res.status(404).send({message: "Receiver not found"});
			}


			// Check if sender has enough balance
			if(sender.balance < amount){
				return res.status(400).send({message: "Insufficient balance"});
			}

			// Perform transacton 
			sender.balance -= amount;
			receiver.balance += amount;

			// Log before saving
			console.log("Updating sender balance: ", sender);
			console.log("Updating receiver balance: ", receiver);

			// Save updated users
			await sender.save();
			await receiver.save();

			// Log after saving
			console.log("Updating sender balance: ", sender);
			console.log("Updating receiver balance: ", receiver);

			// Save transaction record
			const transaction = new Transaction({
				senderUpiId,
				receiverUpiId,
				amount
			});
			await transaction.save();
			
			res.status(200).send({message: "Transaction successfull"});
		} catch(err){
			console.log("Transaction error: ", erroe);
			res.status(500).send({ message: "Server error"});
		}
	});

	// Get Transaction Route
	app.get('/api/transaction/:upiID', async(req, res) => {
		try{
			const {upiID} = req.params;

			// Find transactions for the given UPI ID
			const transaction = await Transaction.find({
				$or: [{senderUpiId: upiID}, {receiverUpiId: upiID}]
			}).sort({timeStamp: -1});

			res.status(200).send(transaction);
		} catch(err){
			console.error(err);
			res.status(500).send({message: "Server error"});
		}
	});

	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));