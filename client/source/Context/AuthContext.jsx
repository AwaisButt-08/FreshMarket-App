import { useRef, useState } from "react"
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const loginCompleted = useRef(false);
    useEffect(() => {
        const Auth = async () => {
            console.log("REFRESH EFFECT STARTED");
            try {
                
                const refresh = await fetch("http://localhost:5000/api/auth/refresh", {
                    method: "POST",
                    credentials: "include",
                });

                if (!refresh.ok) {
                    throw new Error("Session Expired!")
                }

                const data = await refresh.json();

                accessToken.current = data.accessToken;

                console.log("REFRESH TOKEN ASSIGNED:", data.accessToken);


                const me = await fetch("http://localhost:5000/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${data.accessToken}`,
                    },
                    credentials: "include",
                });

                if (!me.ok) {
                    throw new Error("Cannot fetch user")
                };

                const medata = await me.json();

                setUser(medata.user)
            } catch(error) {
                if (!loginCompleted.current) {
                    accessToken.current = null;
                    setUser(null);
                }
                console.log("REFRESH FAILED:", error.message);
            } finally {
                setIsLoading(false);
            }
        }

        Auth();
    }, []);

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const accessToken = useRef(null);
    const isAuthenticated = !!user;

    const login = async (email, password) => {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        accessToken.current = data.accessToken;
        loginCompleted.current = true;

        setUser(data.user);

        return data;
    };

    const register = async (userData) => {
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });

        const data = await response.json();
       

        if (!response.ok) {
            throw new Error("Registration Failed!");
        }

        return data;
    };

    const verifyOtp = async (email, otp) => {
        const response = await fetch("http://localhost:5000/api/auth/verifyOtp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, otp }),
        });

        const data = await response.json();

        if (!response.ok) {
            const error = new Error(data.message || "Verification failed!");
            error.status = response.status;
            throw error;
        }

        return data;
    };

    const logout = async () => {

        console.log("LOGOUT ACCESS TOKEN:", accessToken.current);
        const response = await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken.current}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Logout request failed!");
        }

        const data = await response.json();


        accessToken.current = null;

        setUser(null);

        return data;


    };

    const getAccessToken = async () => {
        return accessToken.current;
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                register,
                verifyOtp,
                logout,
                getAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};