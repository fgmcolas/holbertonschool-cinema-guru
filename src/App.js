import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./routes/dashboard/Dashboard";
import Authentication from "./routes/auth/Authentication";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userUsername, setUserUsername] = useState("");

    useEffect(() => {
        const authenticateUser = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                setIsLoggedIn(false);
                return;
            }

            try {
                const response = await fetch("/api/auth/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Authentication failed");
                }

                const data = await response.json();
                setIsLoggedIn(true);
                setUserUsername(data.username);
                localStorage.setItem("username", data.username);
            } catch (error) {
                console.error("Authentication error:", error);
                setIsLoggedIn(false);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("username");
            }
        };

        authenticateUser();
    }, []);

    return (
        <div className="App">
            {isLoggedIn ? (
                <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
            )}
        </div>
    );
}

export default App;
