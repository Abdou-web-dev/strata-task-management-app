import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { authFormValidationSchema } from "../validation/authFormValidationSchema";

interface AuthFormProps {
  onSubmit: (username: string | undefined, email: string, password: string) => void;
  isSignUp: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isSignUp }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;

  const formikAuthForm = useFormik({
    initialValues: {
      password: "",
      email: "",
      username: "",
    },
    validationSchema: authFormValidationSchema(isSignUp),
    onSubmit: (values, { resetForm }) => {
      if (isSignUp) {
        onSubmit(values.username, values.email, values.password);
      } else {
        onSubmit(undefined, values.email, values.password);
      }
      resetForm();
    },
  });

  const inputWrapperClassName = `mb-4 xl:flex xl:flex-row xl:justify-between xl:gap-8 xl:items-center
  sm:flex sm:flex-col sm:justify-between sm:gap-1 sm:items-center`;

  const inputClassName = `form-input pl-2 mt-1 block w-full sm:w-3/4 md:w-2/3 lg:w-2/3 h-10 border border-gray-300 rounded-md focus:outline-none focus:shadow-lg focus:shadow-indigo-100 hover:shadow-md hover:shadow-gray-300 transition-shadow duration-200`;

  return (
    <form
      className="auth-form-component  bg-gray-100 p-4 xl:p-8 rounded-md shadow-md"
      onSubmit={formikAuthForm.handleSubmit}
    >
      {pathname === "/signup" && isSignUp ? (
        <div className={`${inputWrapperClassName} `}>
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
            name="username"
            value={formikAuthForm.values.username}
            onChange={formikAuthForm.handleChange}
            onBlur={formikAuthForm.handleBlur} //Errors are shown as soon as the user interacts with a field.
            required
          />
        </div>
      ) : null}

      <>
        {formikAuthForm.touched.username && formikAuthForm.errors.username ? (
          <div className="flex items-center justify-center text-red-500 text-xs mt-1 mb-6">
            {formikAuthForm.errors.username}
          </div>
        ) : null}
      </>

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
          name="email"
          value={formikAuthForm.values.email}
          onChange={formikAuthForm.handleChange}
          onBlur={formikAuthForm.handleBlur}
          required
        />
      </div>
      <>
        {formikAuthForm.touched.email && formikAuthForm.errors.email ? (
          <div className="flex items-center justify-center text-red-500 text-xs mt-1 mb-6">
            {formikAuthForm.errors.email}
          </div>
        ) : null}
      </>
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
          name="password"
          value={formikAuthForm.values.password}
          onChange={formikAuthForm.handleChange}
          onBlur={formikAuthForm.handleBlur}
          required
        />
      </div>
      <>
        {formikAuthForm.touched.password && formikAuthForm.errors.password ? (
          <div className="flex items-center justify-center text-red-500 text-xs mt-1 mb-6">
            {formikAuthForm.errors.password}
          </div>
        ) : null}
      </>
      <div className="flex items-center flex-col justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {pathname === "/signup" ? "Sign Up" : pathname === "/login" ? "Login" : ""}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
