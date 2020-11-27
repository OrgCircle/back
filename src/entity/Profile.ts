import { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  name: string;
  photoUrl?: string;
  password?: string;
}

export const ProfileSchema: Schema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    photoUrl: { type: String, required: false },
    password: { type: String, required: false, select: false },
  },
  { timestamps: true }
);
