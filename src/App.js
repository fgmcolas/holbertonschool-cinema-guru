import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./routes/dashboard/Dashboard";
import Authentication from "./routes/auth/Authentication";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userUsername, setUserUsername] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const storedUsername = localStorage.getItem("username");

        if (accessToken) {
            setIsLoggedIn(true);
            setUserUsername(storedUsername || "");
        }
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
