import mongoose, { Document, Schema } from "mongoose";

export interface TaskDocument extends Document {
  title: string;
  description: string;
  status: "pending" | "completed";
  userId: mongoose.Types.ObjectId; // Reference to the User model
}

// schema for the task model
const taskSchema = new Schema<TaskDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
});

export const Task = mongoose.model<TaskDocument>("Task", taskSchema);
