import React from "react";
import { loginUser } from "../api/auth";
import AuthForm from "../components/AuthForm";

const Login: React.FC = () => {
  const handleLogin = async (username: string, email: string, password: string) => {
    try {
      const data = await loginUser(username, password);
      localStorage.setItem("token", data.token);
      // Redirect to the tasks page or another appropriate page
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
