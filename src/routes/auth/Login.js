import React from "react";
import "./auth.css";
import Input from "../../components/general/Input";
import Button from "../../components/general/Button";

const Login = ({ username, password, setUsername, setPassword }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Login attempted:", { username, password });
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <Input label="Username" type="text" value={username} setValue={setUsername} />
            <Input label="Password" type="password" value={password} setValue={setPassword} />
            <Button label="Login" type="submit" />
        </form>
    );
};

export default Login;
