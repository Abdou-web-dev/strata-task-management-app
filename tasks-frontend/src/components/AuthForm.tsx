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

  const inputWrapperClassName = `mb-8 xl:flex xl:flex-row xl:justify-between xl:gap-8 xl:items-center
  sm:flex sm:flex-col sm:justify-between sm:gap-1 sm:items-center`;

  const inputClassName = `form-input pl-2 mt-1 block w-full sm:w-3/4 md:w-2/3 lg:w-2/3 h-10 border border-gray-300 rounded-md focus:outline-none focus:shadow-lg focus:shadow-indigo-100 hover:shadow-md hover:shadow-gray-300 transition-shadow duration-200`;

  return (
    <form
      className="auth-form-component  bg-gray-100 p-4 xl:p-8 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <div className={`${inputWrapperClassName} `}>
        {/* <div className="mb-8 flex flex-row justify-between gap-8 items-center "> */}
        <label
          className="block text-gray-700 roboto-regular"
          htmlFor="username"
        >
          Username :
        </label>
        <input
          id="username"
          className={`${inputClassName}`}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className={`${inputWrapperClassName}`}>
        <label
          className="block text-gray-700 roboto-regular"
          htmlFor="email"
        >
          Email :
        </label>
        <input
          id="email"
          className={`${inputClassName}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={`${inputWrapperClassName}`}>
        <label
          className="block text-gray-700 roboto-regular"
          htmlFor="password"
        >
          Password :
        </label>
        <input
          id="password"
          className={`${inputClassName}`}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center flex-col justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          {pathname === "/signup" ? "Sign Up" : pathname === "/login" ? "Login" : ""}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
