import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:5000/api";

export const getTasks = async (token: string) => {
  // making an authenticated request to this backend endpoint
  // tasks is a protected route, meaning only autehnticated users can access it.
  // each user has its own unique list of associated tasks.
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createTask = async (title: string, description: string, status: string, token: string) => {
  const EndpointURL = `${API_URL}/tasks`;
  const ReqBody = { title, description, status };
  const response = await axios.post(EndpointURL, ReqBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteTask = async (taskId: string, token: string) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async (
  taskId: string,
  token: string,
  newTitle?: string,
  newDesc?: string,
  newStatus?: "completed" | "pending"
) => {
  try {
    const updateReqBody = {
      ...(newTitle && { title: newTitle }),
      ...(newDesc && { description: newDesc }),
      ...(newStatus && { status: newStatus }),
    };

    const response = await axios.put(`${API_URL}/tasks/${taskId}`, updateReqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
