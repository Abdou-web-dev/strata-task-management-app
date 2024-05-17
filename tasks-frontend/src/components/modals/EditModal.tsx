import { FunctionComponent, useContext, useState } from "react";
import Modal from "react-modal";
import closeIcon from "../../../assets/img/close.svg";
import { useFormik } from "formik";
import { TasksContext } from "../../context/tasksContext";
import { taskValidationSchema } from "../../validation/taskValidationSchema";

interface EditModalProps {}

const EditModal: FunctionComponent<EditModalProps> = () => {
  const { editModalOpen, setEditModalOpen } = useContext(TasksContext);

  const formikUpdateTaskForm = useFormik({
    initialValues: {
      newName: "",
      newDescription: "",
      newStatus: "",
    },
    validationSchema: taskValidationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values.newDescription, values.newName);

      //   if (error.length > 0) {
      //     return; // leave the onSubmit function early if there is a server error
      //   } else {
      //     resetForm; // if there is no backend error , then clear the form fields
      //   }
    },
  });

  return (
    <Modal
      isOpen={editModalOpen}
      onRequestClose={() => {
        setEditModalOpen(false);
      }}
      contentLabel="Edit Task Modal"
      style={{
        content: {
          width: "40%",
          height: "50%",
          margin: "0 auto",
          position: "relative",
          top: "5rem",
          background: "rgba(128, 128, 128, 0.25)",
        },
      }}
      className={"relative edit-modal"}
    >
      <button
        onClick={() => {
          setEditModalOpen(false);
        }}
        className="top-2 right-2 absolute"
      >
        <img
          width={`30px`}
          src={closeIcon}
          alt=""
        />
      </button>
      <h3 className="italic text-2xl font-semibold mb-4">Edit Category : </h3>
      <form onSubmit={formikUpdateTaskForm.handleSubmit}>
        <div className="mb-4 modal-content">
          <label
            htmlFor="editLabel"
            className="block text-sm font-medium text-gray-700"
          >
            Label :
          </label>
          <input
            type="text"
            id="newName"
            className="mt-1 p-2 border w-full rounded-md hover:shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Enter a new name"
            name="newName"
            value={formikUpdateTaskForm.values.newName}
            onChange={formikUpdateTaskForm.handleChange}
            onBlur={formikUpdateTaskForm.handleBlur}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="editPosition"
            className="block text-sm font-medium text-gray-700"
          >
            Position :
          </label>
          <input
            type="text"
            id="newDescription"
            className="mt-1 p-2 border rounded-md w-full hover:shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Enter a new description"
            name="newDescription"
            value={formikUpdateTaskForm.values.newDescription}
            onChange={formikUpdateTaskForm.handleChange}
            onBlur={formikUpdateTaskForm.handleBlur}
          />
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
            value={formikUpdateTaskForm.values.newStatus}
            name="status"
            onChange={formikUpdateTaskForm.handleChange}
            onBlur={formikUpdateTaskForm.handleBlur}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          {formikUpdateTaskForm.touched.newStatus && formikUpdateTaskForm.errors.newStatus ? (
            <div className="text-red-500 text-xs mt-1 mb-6">{formikUpdateTaskForm.errors.newStatus}</div>
          ) : null}
        </div>
        <>{/* errors ?? */}</>
        <div className="mt-10">
          <button
            type="submit"
            className="modal-btn-yes bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-md"
            onClick={async () => {}}
          >
            {/* what to put here ? */}
            <span>Update</span>
          </button>

          <button
            type="button"
            // className="modal-btn-no ml-2 text-gray-600 hover:text-gray-800"
            className="cancel-btn ml-4 bg-rose-300 hover:bg-rose-500 text-white p-2 rounded-md  transition-all duration-300 ease-in-out"
            onClick={() => setEditModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
