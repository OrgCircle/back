import { Schema, Document } from "mongoose";
import { Field, ObjectType } from "../../lib";
import { Input } from "../../lib/decorators/Input";

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

@Input
export class ProfileInput implements Partial<IProfile> {
  @Field({ description: "Name of the familly" })
  name: string;

  @Field({ description: "Email of he familly", nullable: true })
  photoUrl?: string;

  @Field({ description: "Password of the familly account", nullable: true })
  password?: string;
}

@ObjectType
export class ProfileObject implements Partial<IProfile> {
  @Field({ description: "Object identifier" })
  _id: string;

  @Field({ description: "Name of the familly" })
  name: string;

  @Field({ description: "Email of he familly" })
  photoUrl: string;

  @Field({ description: "The token" })
  token?: string;
}
