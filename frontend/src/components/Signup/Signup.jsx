import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup(){
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {name, mail, password};

        axios.post('http;//localhost:3000/api/signup', user) // Updated port
        .then((res) => {
            alert("Signup successfully");
            setName("");
            setMail("");
            setPassword("");
            setErrorMessage("");
        })
        .catch((err) => {
            console.log("Signup error", err.res?.data?.message || err.message);
            setErrorMessage(err.res?.data?.message || "Error signing up");
        });


        return(
            <></>
        )
    }
}