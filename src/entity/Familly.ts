import { Document, Schema, model } from "mongoose";
import { IProfile } from "./Profile";

export interface IFamilly extends Document {
  name: string;
  email: string;
  password: string;
  profiles: IProfile[];
}

const FamillySchema: Schema = new Schema<IFamilly>({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profiles: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
});

export default model<IFamilly>("Familly", FamillySchema);
