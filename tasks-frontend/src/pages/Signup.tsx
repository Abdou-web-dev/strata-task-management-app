import React from "react";
import { registerUser } from "../api/auth";
import AuthForm from "../components/AuthForm";

const Signup: React.FC = () => {
  const handleSignup = async (username: string, email: string, password: string) => {
    try {
      const { token } = await registerUser(username, email, password);
      console.log(token, "token");
      localStorage.setItem("token", token);
      console.log("Signup successful, token generated upon Signup is:", token);

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
