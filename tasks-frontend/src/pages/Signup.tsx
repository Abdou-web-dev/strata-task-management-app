import React from "react";
import { registerUser } from "../api/auth";
import AuthForm from "../components/AuthForm";

const Signup: React.FC = () => {
  const handleSignup = async (username: string, email: string, password: string) => {
    try {
      const data = await registerUser(username, email, password);
      console.log(data, "data");
      localStorage.setItem("token", data.token);
      console.log("Signup successful, token:", data.token);

      // Redirect to the tasks page or another appropriate page
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <AuthForm
        onSubmit={handleSignup}
        isSignup
      />
    </div>
  );
};

export default Signup;
