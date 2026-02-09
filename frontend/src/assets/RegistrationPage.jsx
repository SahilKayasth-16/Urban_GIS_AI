import React, { useState } from "react";
import "../styles/RegistrationPage.css";
import { Link, useNavigate } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";

const RegistrationPage = () => {
    const [ username, setName ] = useState("");

    const [ email, setEmail ] = useState("");

    const [ createPass, setCreatePass ] = useState("");

    const [ confirmPass, setConfirmPass ] = useState("");

    const [ role, setRole ] = useState("user");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username || !email || !createPass || !confirmPass) {
            alert("Please fill all fields.");
            return;
        }

        if (createPass !== confirmPass) {
            alert("Passwords do not match.");
        }

        try {
            const res = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username.trim(),
                    email: email.trim(),
                    password: createPass,
                    role: role
                })
            });

            const data = await res.json();

            if (!role) {
                alert("Please select a role first");
                return;
            }

            if (!res.ok) {
                alert("Registration Failed" || data.detail);
                return;
            }

            alert("Registration completed successfully. Please Login");
            navigate("/login");

        } catch(error) {
            console.error(error);
            alert("Server error. Please try again later.")
        }
    };

    return (
        <>
        <VideoBackground />
        <div className="main">
            <h1>Create Account</h1>
            <h3>Join UrbanGIS AI today</h3>

            <form onSubmit={handleRegister}>
            <label htmlFor="username">Username:</label>
            <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="email">Email ID:</label>
            <input type="email" placeholder="Enter your email ID" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="role">Register as:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} placeholder="Select your role">
                <option value="user">User</option>
                <option value="business_owner">Business owner</option>
            </select>

            <label htmlFor="create_password">Create Password:</label>
            <input type="password" placeholder="Create your password" value={createPass} onChange={(e) => setCreatePass(e.target.value)} />

            <label htmlFor="confirm_password">Confirm Password:</label>
            <input type="password" placeholder="Confirm your password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                
            <button type="submit" >Register</button>
            
            <h5>
                Already Registered | <Link to={'/login'}>Login here</Link>
            </h5>
            </form>
        </div>
        </>
    );
}

export default RegistrationPage;