import { ObjectId } from "mongodb";
import { Document, Schema, model, Types } from "mongoose";
import { IProfile } from "./Profile";

export interface IEvent extends Document {
  famillyId: Types.ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  assigned_to: Partial<IProfile> | string;
  created_by: Partial<IProfile> | string;
}

const EventSchema: Schema = new Schema<IEvent>(
  {
    famillyId: { type: Types.ObjectId, ref: "Familly" },
    name: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String },
    assigned_to: { type: ObjectId, ref: "Familly.profiles" },
    created_by: { type: ObjectId, ref: "Familly.profiles" },
  },
  { timestamps: true }
);

export default model<IEvent>("Event", EventSchema);
