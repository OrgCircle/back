import { Types } from "mongoose";
import { Field } from "../../lib";
import { IEvent } from "../entity/Event";
import { IProfile } from "../entity/Profile";

export class EventObject implements Partial<IEvent> {
  @Field({ description: "Family ID" })
  famillyId: Types.ObjectId;

  @Field({ description: "Event name" })
  name: string;

  @Field({ description: "Start date of the event" })
  startDate: Date;

  @Field({ description: "End date of the event" })
  endDate: Date;

  @Field({ description: "Location of the event", nullable: true })
  location: string;

  @Field({ description: "Assigned to profile", nullable: true })
  assigned_to: Partial<IProfile>;

  @Field({ description: "Created by profile" })
  created_by: Partial<IProfile>;
}

export class EventInput implements Partial<IEvent> {
  @Field({ description: "Event name" })
  name: string;

  @Field({ description: "Start date of the event" })
  startDate: Date;

  @Field({ description: "End date of the event" })
  endDate: Date;

  @Field({ description: "Location of the event", nullable: true })
  location: string;

  @Field({ description: "Assigned to profile", nullable: true })
  assigned_to: Partial<IProfile>;
}
