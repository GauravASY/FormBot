import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [localToken, setLocalToken] = useState(localStorage.getItem('token')); 

    useEffect(() => {
        if (localToken) {
            fetchUser(localToken);
        } else {
            setUser(null);
        }
    }, [localToken]); 

    useEffect(() => {
        const publicRoutes = ['/signin', '/signup']; 
        if (!localToken && !publicRoutes.includes(location.pathname)) {
            navigate('/signin');
        }
    }, [localToken, location]);

    async function fetchUser (token){
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user`, {
                headers: { Authorization: token },
            });
            if (data.success) {
                setUser(data.user);
            } else {
                console.error("API returned an error:", data);
                localStorage.removeItem('token');
                setLocalToken(null); 
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            localStorage.removeItem('token');
            setLocalToken(null); 
            setUser(null);
        }
    };
    function setToken(token) {
        localStorage.setItem('token', token);
        setLocalToken(token);
    }
    function logout () {
        localStorage.removeItem('token');
        setLocalToken(null);
        setUser(null);
        navigate('/signin');
    }
    return (
        <UserContext.Provider value={{ user, setUser, setToken, logout, localToken }}>
            {children}
        </UserContext.Provider>
    );
};

export function useUser() {
    return useContext(UserContext);
}