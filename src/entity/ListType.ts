import { Document, Schema, model } from "mongoose";
import { Field, ObjectType } from "../../lib";
import { Input } from "../../lib/decorators/Input";

export interface IListType extends Document {
  label: string;
  icon: string;
}

export const ListTypeSchema: Schema = new Schema<IListType>(
  {
    label: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
  },
  { timestamps: false }
);

@Input
export class ListTypeInput implements Partial<IListType> {
  @Field({ description: "Label of the list type" })
  label: string;

  @Field({ description: "Icon of the list type" })
  icon: string;
}

@ObjectType
export class ListTypeObject implements Partial<IListType> {
  @Field({ description: "Object identifier" })
  _id: string;

  @Field({ description: "Label of the list type" })
  label: string;

  @Field({ description: "Icon of the list type" })
  icon: string;
}

export default model<IListType>("ListType", ListTypeSchema);
