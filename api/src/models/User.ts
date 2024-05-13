import mongoose, { Document, Schema } from "mongoose";

// Define the interface representing a user document
export interface UserDocument extends Document {
  username: string;
  password: string;
  email: string;
}

// Define the schema for the user model
const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Create and export the User model
export const User = mongoose.model<UserDocument>("User", userSchema);
