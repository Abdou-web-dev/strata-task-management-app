import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import closeIcon from "../../../assets/img/close.svg";
import { useFormik } from "formik";
import { TasksContext } from "../../context/tasksContext";
import { Task } from "../../types/taskTypes";
import { updateFormValidationSchema } from "../../validation/taskValidationSchema";

interface EditModalProps {
  onRequestClose: () => void;
  taskToEdit: Task;
  onSave: (taskId: string, newTitle?: string, newDesc?: string, newStatus?: "completed" | "pending") => Promise<void>;
}

const EditModal: FunctionComponent<EditModalProps> = ({ onRequestClose, taskToEdit, onSave }) => {
  const { editModalOpen, setEditModalOpen } = useContext(TasksContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const formikUpdateTaskForm = useFormik({
    initialValues: {
      newName: taskToEdit?.title,
      newDescription: taskToEdit?.description,
      newStatus: taskToEdit?.status,
    },
    validationSchema: updateFormValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      await onSave(taskToEdit._id, values.newName, values.newDescription, values.newStatus);
      resetForm();
      onRequestClose();
    },
  });

  return (
    <Modal
      isOpen={editModalOpen}
      onRequestClose={() => {
        onRequestClose();
        setEditModalOpen(false);
      }}
      contentLabel="Edit Task Modal"
      style={{
        content: {
          width: "40%",
          height: "70%",
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
          onRequestClose();

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
      <h3 className="italic text-2xl font-semibold mb-4">Update this task : </h3>
      <form onSubmit={formikUpdateTaskForm.handleSubmit}>
        <div className="mb-4 modal-content">
          <label
            htmlFor="editLabel"
            className="block text-sm font-medium text-gray-700"
          >
            New name :
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
          {formikUpdateTaskForm.touched.newName && formikUpdateTaskForm.errors.newName ? (
            <div className="text-red-500 text-xs mt-1 mb-6">{formikUpdateTaskForm.errors.newName}</div>
          ) : null}
        </div>
        <div className="mb-4 textarea-container">
          <label
            htmlFor=""
            className="block text-sm font-medium text-gray-700"
          >
            New Description :
          </label>
          <textarea
            id="newDescription"
            placeholder="Enter a new description"
            name="newDescription"
            value={formikUpdateTaskForm.values.newDescription}
            onChange={formikUpdateTaskForm.handleChange}
            onBlur={formikUpdateTaskForm.handleBlur}
            required
            ref={textareaRef}
            onResize={() => {
              console.log("resized");
            }}
            style={{
              maxWidth: `${500}px`,
              maxHeight: `${400}px`,
            }}
            className="edit-resize-textarea w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {formikUpdateTaskForm.touched.newDescription && formikUpdateTaskForm.errors.newDescription ? (
            <div className="text-red-500 text-xs mt-1 mb-6">{formikUpdateTaskForm.errors.newDescription}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block mb-2"
          >
            New Status:
          </label>
          <select
            id="newStatus"
            value={formikUpdateTaskForm.values.newStatus}
            name="newStatus"
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
          >
            {/* what to put here ? */}
            <span>Update</span>
          </button>

          <button
            type="button"
            className="cancel-btn ml-4 bg-rose-300 hover:bg-rose-500 text-white p-2 rounded-md  transition-all duration-300 ease-in-out"
            onClick={() => {
              onRequestClose();
              setEditModalOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
