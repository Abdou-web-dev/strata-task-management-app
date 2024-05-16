import React, { useContext } from "react";
import { registerUser } from "../api/auth";
import AuthForm from "../components/AuthForm";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (username: string, email: string, password: string) => {
    try {
      const { token } = await registerUser(username, email, password);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", token);
      console.log(token, "token");
      // console.log("Signup successful, token generated upon Signup is:", token);

      // Redirect to the tasks page or another appropriate page
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col my-24">
      <div className="w-full sm:w-1/2 lg:w-[35%]">
        <AuthForm onSubmit={handleSignup} />
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
  );
};

export default Signup;
