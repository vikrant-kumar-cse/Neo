import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsAuthenticated(true);

            // If user is on auth pages, redirect them to dashboard
            if (
                location.pathname === '/' ||
                location.pathname === '/brandlogin' ||
                location.pathname === '/brandsignup'
            ) {
                navigate('/admin-dashboard', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated]);

    return null;
}

export default RefrshHandler;
