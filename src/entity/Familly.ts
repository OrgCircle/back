import { Document, Schema, model } from "mongoose";
import { IProfile, ProfileSchema } from "./Profile";

export interface IFamilly extends Document {
  name: string;
  email: string;
  profiles?: Partial<IProfile[]>;
}

const FamillySchema: Schema = new Schema<IFamilly>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profiles: [ProfileSchema],
  },
  { timestamps: true }
);

export default model<IFamilly>("Familly", FamillySchema);
