import { Document, Schema, model } from "mongoose";
import { IProfile, ProfileSchema } from "./Profile";

export interface IFamilly extends Document {
  name: string;
  email: string;
  password: string;
  profiles?: IProfile[];
}

const FamillySchema: Schema = new Schema<IFamilly>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profiles: [ProfileSchema],
  },
  { timestamps: true }
);

export default model<IFamilly>("Familly", FamillySchema);
