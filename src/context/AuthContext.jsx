import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setUser(null);
    };

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        try {
            const decoded = jwtDecode(token);
            const username = decoded.sub;
            localStorage.setItem('usuario', username);
            setUser(username);
        } catch (error) {
            console.error("Token inválido al hacer login:", error);
            handleLogout();
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded.sub); 
                } else {
                    handleLogout();
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                handleLogout();
            }
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};