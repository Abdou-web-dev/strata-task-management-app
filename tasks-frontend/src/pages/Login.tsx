import React, { useContext } from "react";
import { loginUser } from "../api/auth";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../globalStyles/globalStyles.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async (username: string, email: string, password: string) => {
    try {
      const data = await loginUser(username, password, email);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      // console.log("Login successful, token upon login is:", data.token);
      // Redirect to the tasks page
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col my-24">
      {/* <h2>Login</h2> */}
      <div className="w-full sm:w-1/2 lg:w-[35%]">
        {/* Responsive width */}
        <AuthForm onSubmit={handleLogin} />
      </div>
      <div className="mt-4 text-center">
        <p className="my-4 sedan-regular">Don't have an account ? Make a new one.</p>
        <button
          className="bg-slate-500  hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
