import React from "react";
import "./dashboard.css";
import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
    return (
        <div className="dashboard-container">
            <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
            <div className="dashboard-layout">
                <SideBar />
                <div className="dashboard-content">
                    <h1>Dashboard</h1>
                    <p>Bienvenue dans votre espace personnel !</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
