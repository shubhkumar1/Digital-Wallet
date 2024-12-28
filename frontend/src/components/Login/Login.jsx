import react from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {mail, password};

        axios.post('http://localhost:3000/api/login', user)
        .then((res) => {
            const {upiID, message, balance} = res.data;

            //Store user info in local storage
            console.log(">>>>>. ", upiID);
            localStorage.setItem(
                "user",
                JSON.stringify({mail, upiID, balance})
            );

            alert(message);
            navigate("/transaction"); // Navigate to the transaction page
            window.location.reload();
        })
        .catch((err) => alert("Error logging in"));
    };

    return(
        <></>
    );


}