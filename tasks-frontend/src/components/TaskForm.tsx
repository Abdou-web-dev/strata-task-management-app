import React, { useState } from "react";
import { taskValidationSchema } from "../validation/taskValidationSchema";
import { useFormik } from "formik";

interface TaskFormProps {
  onSubmit: (title: string, description: string, status: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit: addTask }) => {
  const formikAddTask = useFormik({
    initialValues: {
      status: "",
      description: "",
      title: "",
    },
    validationSchema: taskValidationSchema,
    onSubmit: (values, { resetForm }) => {
      addTask(values.title, values.description, values.status);
      resetForm();
    },
    validate: () => {},
  });

  return (
    <form
      onSubmit={formikAddTask.handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-2"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title" //The name attribute should match the field name in formik initialValues.
          value={formikAddTask.values.title}
          onChange={formikAddTask.handleChange}
          onBlur={formikAddTask.handleBlur} //Errors are shown as soon as the user interacts with a field.
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        {formikAddTask.touched.title && formikAddTask.errors.title ? (
          <div className="text-red-500 text-xs mt-1 mb-6">{formikAddTask.errors.title}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-2"
        >
          Description:
        </label>
        <textarea
          id="description"
          value={formikAddTask.values.description}
          name="description"
          onChange={formikAddTask.handleChange}
          onBlur={formikAddTask.handleBlur}
          // onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        ></textarea>
        {formikAddTask.touched.description && formikAddTask.errors.description ? (
          <div className="text-red-500 text-xs mt-1 mb-6">{formikAddTask.errors.description}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block mb-2"
        >
          Status:
        </label>
        <select
          id="status"
          value={formikAddTask.values.status}
          name="status"
          onChange={formikAddTask.handleChange}
          onBlur={formikAddTask.handleBlur}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        {formikAddTask.touched.status && formikAddTask.errors.status ? (
          <div className="text-red-500 text-xs mt-1 mb-6">{formikAddTask.errors.status}</div>
        ) : null}
      </div>
      <button
        type="submit"
        onClick={() => console.log("submit btn clicked")}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
