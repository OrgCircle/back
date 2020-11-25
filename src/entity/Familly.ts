import { Document, Schema, model } from "mongoose";
import { Field } from "../../lib";
import { Input } from "../../lib/decorators/Input";
import { IProfile } from "./Profile";

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
    profiles: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  },
  { timestamps: true }
);

@Input
export class FamillyInput implements Partial<IFamilly> {
  @Field({ description: "Name of the familly" })
  name: string;

  @Field({ description: "Email of he familly" })
  email: string;

  @Field({ description: "Password of the familly account" })
  password: string;
}

export default model<IFamilly>("Familly", FamillySchema);
