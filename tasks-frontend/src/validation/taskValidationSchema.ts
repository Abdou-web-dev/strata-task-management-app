import * as Yup from "yup";

export const taskValidationSchema = Yup.object({
  title: Yup.string().required("Please type a name"),
  description: Yup.string().required("Please, give your task a description"),
  status: Yup.string().required("Please, choose a status"),
});
