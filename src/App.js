import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Dashboard from "./routes/dashboard/Dashboard";
import Authentication from "./routes/auth/Authentication";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      axios
        .post("/api/auth/", {}, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((response) => {
          setIsLoggedIn(true);
          setUserUsername(response.data.username);
        })
        .catch((error) => {
          console.error("Authentication failed:", error);
          setIsLoggedIn(false);
          setUserUsername("");
        });
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
