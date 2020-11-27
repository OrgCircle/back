import { Document, Schema, model } from "mongoose";
import { Field, ObjectType } from "../../lib";
import { Input } from "../../lib/decorators/Input";
import { ITask, TaskSchema } from "./Task";
import { IListType, ListTypeSchema } from "./ListType";

export interface IList extends Document {
  name: string;
  content?: ITask[];
  listType: IListType;
}

const ListSchema: Schema = new Schema<IList>(
  {
    name: { type: String, required: true },
    content: { type: [TaskSchema] },
    listType: { type: ListTypeSchema, required: true },
  },
  { timestamps: true }
);

@Input
export class ListInput implements Partial<IList> {
  @Field({ description: "Name of the list" })
  name: string;

  @Field({ description: "Tasks of the list" })
  content?: ITask[];

  @Field({ description: "Type of the list" })
  listType: IListType;
}

@ObjectType
export class ListObject implements Partial<IList> {
  @Field({ description: "Object identifier" })
  _id: string;

  @Field({ description: "Name of the list" })
  name: string;

  @Field({ description: "Tasks of the list" })
  content?: ITask[];

  @Field({ description: "Type of the list" })
  listType: IListType;
}

export default model<IList>("List", ListSchema);
