import { Service } from "typedi";
import { HttpException } from "../../lib/types/HttpException";
import Event from "../entity/Event";
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
    const event = await Event.findOneAndDelete({
      famillyId,
      _id: eventId,
    }).exec();
    if (!event) throw new HttpException(404, "Event not found");
    return event;
  }

  async patchEvent(
    famillyId: string,
    eventId: string,
    { assigned_to, endDate, location, name, startDate }: EventInput,
    { _id, role }: { _id: string; role: string }
  ) {
    const foundEvent = await Event.findOne({ _id: eventId, famillyId });
    if (!foundEvent) throw new HttpException(404, "Event bot found");
    if (assigned_to) foundEvent.assigned_to = assigned_to;
    if (endDate) foundEvent.endDate = endDate;
    if (location) foundEvent.location = location;
    if (name) foundEvent.name = name;
    if (startDate) foundEvent.startDate = startDate;

    if (
      foundEvent.created_by === _id ||
      foundEvent.assigned_to.includes(_id) ||
      role === "ADMIN"
    ) {
      return foundEvent.save();
    }
    throw new HttpException(403, "Not authorized");
  }
}
