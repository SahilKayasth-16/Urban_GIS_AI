import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ChangePassword.css";
import VideoBackground from "../components/VideoBackground";

const ChangePassword = () => {
    const [ username, setUsername ] = useState("");

    const [ oldPassword, setOldPassword ] = useState("");

    const [ newPassword, setNewPassword ] = useState("");

    const [ confirmPassword, setConfirmPassword ] = useState("");

    const navigate = useNavigate();
    
    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!username || !oldPassword || !newPassword || !confirmPassword) {
            alert("All fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/auth/change-password", {
                method: "POST",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify({
                    username,
                    old_password: oldPassword,
                    new_password: newPassword,
                    confirm_password: confirmPassword
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert("Failed to change password" || data.detail);
                return;
            }

            alert("Password updated successfully.");
            navigate("/login");

        } catch(error) {
            console.error(error);
            alert("Server error")
        }
    };

    return(
        <>
        <VideoBackground />
        <div className="main">
            <h1>Change Password</h1>
            <h3>Update your account password.</h3>

            <form onSubmit={handleChangePassword}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />

                <label>Old Password:</label>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter old password" />

                <label htmlFor="new_password">New Password:</label>
                <input type="password" id="new_password" value={newPassword} placeholder="Enter new password" onChange={(e) => setNewPassword(e.target.value)} />

                <label htmlFor="confirm_password">Confirm Password:</label>
                <input type="password" id="confirm_password" value={confirmPassword} placeholder="Enter username" onChange={(e) => setConfirmPassword(e.target.value)} />

                <button type="submit">Change Password</button>

                <h5>Back to <Link to={"/login"}>Login</Link></h5>
            </form>
        </div>
        </>
    );
}

export default ChangePassword;