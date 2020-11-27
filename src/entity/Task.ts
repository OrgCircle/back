import { Document, Schema, model } from "mongoose";
import { Field, ObjectType } from "../../lib";
import { Input } from "../../lib/decorators/Input";

export interface ITask extends Document {
  label: string;
  state: boolean;
}

export const TaskSchema: Schema = new Schema<ITask>(
  {
    label: { type: String },
    state: { type: Boolean },
  },
  { timestamps: false }
);

@Input
export class TaskInput implements Partial<ITask> {
  @Field({ description: "Label of the task" })
  label: string;

  @Field({ description: "State of the task" })
  state: boolean;
}

@ObjectType
export class TaskObject implements Partial<ITask> {
  @Field({ description: "Object identifier" })
  _id: string;

  @Field({ description: "Label of the task" })
  label: string;

  @Field({ description: "State of the task" })
  state: boolean;
}

export default model<ITask>("Task", TaskSchema);
