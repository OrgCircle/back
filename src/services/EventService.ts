import { Service } from "typedi";
import Event, { IEvent } from "../entity/Event";
import { JWTPayload } from "../helpers/jwt";
import { EventInput } from "../inputs/EventInputs";

@Service()
export class EventService {
  async createEvent(eventInput: EventInput, { famillyId, _id }: JWTPayload) {
    const event = new Event({
      ...eventInput,
      famillyId,
      created_by: _id,
    });
    return await event.save();
  }
  async getEvent(famillyId: string, eventId: string) {
    return Event.findOne({ famillyId, _id: eventId }).exec();
  }
  async getEvents(famillyId: string) {
    return Event.find({ famillyId }).exec();
  }

  async getEventsBetweenDates(
    famillyId: string,
    startDate: string,
    endDate: string
  ) {
    return Event.find({
      famillyId,
      startDate: {
        $gte: new Date(startDate),
      },
      endDate: {
        $lte: new Date(endDate),
      },
    }).exec();
  }
  async deleteEvent(eventId: string, famillyId: string) {
    return Event.findOneAndDelete({ famillyId, _id: eventId }).exec();
  }
  async patchEvent(
    famillyId: string,
    eventId: string,
    { assigned_to, endDate, location, name, startDate }: EventInput
  ) {
    const event: Partial<IEvent> = {};
    if (assigned_to) event.assigned_to = assigned_to;
    if (endDate) event.endDate = endDate;
    if (location) event.location = location;
    if (name) event.name = name;
    if (startDate) event.startDate = startDate;
    return Event.findOneAndUpdate(
      { _id: eventId, famillyId },
      { event }
    ).exec();
  }
}
