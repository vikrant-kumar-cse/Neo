import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function AdminLogin() {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) return handleError('All fields are required');

        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });

            const result = await res.json();
            const { success, message, jwtToken, name, role } = result;

            if (success && role === 'admin') {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('role', role);
                setTimeout(() => {
                    navigate('/admin-dashboard');
                }, 1000);
            } else {
                handleError('Only admin can access this login.');
            }

        } catch (err) {
            handleError(err.message || "Something went wrong");
        }
    }

    return (
        <div className='container'>
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={loginInfo.email} onChange={handleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={loginInfo.password} onChange={handleChange} />
                </div>
                <button type="submit">Login as Admin</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AdminLogin;




