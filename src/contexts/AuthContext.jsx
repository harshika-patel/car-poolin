import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/login', { username, password });
            setCurrentUser(response.data); // Store the user data including role
        } catch (error) {
            console.error("Login failed:", error);
            // Handle login error (e.g., show a message to the user)
        }
    };

    const logoutUser = () => {
        setCurrentUser(null); // Clear user data on logout
    };

    return (
        <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
