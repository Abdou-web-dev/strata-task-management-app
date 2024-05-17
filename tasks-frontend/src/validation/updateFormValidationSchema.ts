import * as Yup from "yup";

export const taskValidationSchema = Yup.object({
  title: Yup.string()
    .required("Please type a name")
    .matches(/^[a-zA-Z0-9\s]+$/, "Invalid characters detected"),
  description: Yup.string()
    .required("Please, give your task a description")
    .min(20, "Description must be at least 20 characters long"),
  // .matches(/^[a-zA-Z0-9\s]+$/, "Invalid characters detected")
  status: Yup.string().required("Please, choose a status"),
});
