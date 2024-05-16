import * as Yup from "yup";

export const authFormValidationSchema = (isSignUp: boolean) =>
  Yup.object({
    username: isSignUp
      ? Yup.string().min(3, "Username must be at least 3 characters long").required("Username is required")
      : Yup.string().optional(),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),
  });
