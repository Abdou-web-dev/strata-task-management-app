import React, { useContext, useState } from "react";
import { loginUser } from "../api/auth";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../globalStyles/globalStyles.css";
import { Welcome } from "../components/Welcome";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(""); // State to hold the error message

  // the username parameter must not be removed from the signature of handleLogin
  const handleLogin = async (username: string | undefined, email: string, password: string) => {
    try {
      const data = await loginUser(password, email);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      // console.log("Login successful, token upon login is:", data.token);
      // Redirect to the tasks page
      navigate("/");
    } catch (error: any) {
      console.error("login failed:", error.response.data.message);
      setLoginError(error.response.data.message);
    }
  };

  return (
    <div className="login-page-container ">
      {/* Responsive width */}
      <Welcome />

      <div className="authform-and-button flex justify-center items-center flex-col my-24">
        <div className="w-full sm:w-1/2 lg:w-[35%]">
          <AuthForm
            onSubmit={handleLogin}
            isSignUp={false}
            {...{ error: loginError }}
          />
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
    </div>
  );
};

export default Login;
