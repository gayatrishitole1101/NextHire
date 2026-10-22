import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();   // URL मध्ये username/password येऊ देणार नाही

        try {
            const response = await axios.post(
                "http://localhost:8080/adminlogin",
                {
                    username: username,
                    password: password
                }
            );

            if (response.data === "success") {
                navigate("/admindashboard");
            } else {
                alert("Invalid Username or Password");
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="container mt-5">

            <h2>Admin Login</h2>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Username"
                    className="form-control mb-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="form-control mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default AdminLogin;