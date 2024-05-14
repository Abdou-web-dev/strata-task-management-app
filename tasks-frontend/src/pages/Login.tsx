import React from "react";
import { loginUser } from "../api/auth";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (username: string, email: string, password: string) => {
    try {
      const data = await loginUser(username, password, email);
      localStorage.setItem("token", data.token);
      console.log("Login successful, token upon login is:", data.token);
      // Redirect to the tasks page
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <AuthForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
