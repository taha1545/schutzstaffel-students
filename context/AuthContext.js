"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import { getUser } from "@/services/authServices";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    //
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // 
    const refreshUser = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }
        try {
            const response = await getUser();
            setUser(response.user);
            localStorage.setItem("user", JSON.stringify(response.user));
        } catch (error) {
            if (error?.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);
    const login = async (token) => {
        localStorage.setItem("token", token);
        await refreshUser();
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };
    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                login,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

