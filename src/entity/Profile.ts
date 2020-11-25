import { model, Schema, Document } from "mongoose";
import { IFamilly } from "./Familly";

export interface IProfile extends Document {
  name: string;
  photoUrl?: string;
  password?: string;
  familly: IFamilly;
}

const ProfileSchema: Schema = new Schema<IProfile>({
  name: { type: String, required: true },
  photoUrl: { type: String, required: false },
  password: { type: String, required: false },
  familly: { type: Schema.Types.ObjectId, ref: "Familly" },
});

export default model<IProfile>("Profile", ProfileSchema);
