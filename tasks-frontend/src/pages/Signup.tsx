import React, { useContext, useState } from "react";
import { registerUser } from "../api/auth";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Welcome } from "../components/Welcome";

const Signup: React.FC = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState(""); // State to hold the error message

  const handleSignup = async (username: string | undefined, email: string, password: string) => {
    try {
      const { token } = await registerUser(username, email, password);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      console.log(token, "token");
      navigate("/");
    } catch (error: any) {
      console.error("Signup failed:", error.response.data.message);
      setSignUpError(error.response.data.message);
    }
  };

  return (
    <div className="signup-page-container ">
      <Welcome />
      <div className="flex justify-center items-center flex-col my-24">
        <div className="w-full sm:w-1/2 lg:w-[35%]">
          <AuthForm
            onSubmit={handleSignup}
            isSignUp={true}
            {...{ error: signUpError }}
          />
        </div>

        <div className="mt-4 text-center">
          <p className="my-4 sedan-regular">Already have an account ?</p>

          <button
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
