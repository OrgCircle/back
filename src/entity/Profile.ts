import { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  name: string;
  photoUrl?: string;
  password?: string;
  role: string;
}

export const ProfileSchema: Schema = new Schema<IProfile>(
  {
    name: { type: String, required: true, unique: true },
    photoUrl: { type: String, required: false },
    password: { type: String, required: false, select: false },
    role: { type: String, required: true },
  },
  { timestamps: true }
);
