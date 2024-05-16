import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation } from "react-router-dom";

interface AuthFormProps {
  onSubmit: (username: string, email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;
  console.log(isLoggedIn, "isLoggedIn from authform");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, email, password);
  };

  return (
    <form
      className="auth-form-component bg-gray-100 p-6 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          id="username"
          className="form-input mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          id="email"
          className="form-input mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          id="password"
          className="form-input mt-1 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        {pathname === "/signup" ? "Sign Up" : pathname === "/login" ? "Login" : ""}
      </button>
    </form>
  );
};

export default AuthForm;
