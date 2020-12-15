import {
  Authorized,
  Body,
  ContextType,
  Controller,
  Ctx,
  Delete,
  Get,
  HttpResponse,
  Param,
  Patch,
  Post,
  Query,
} from "../../lib";
import { IEvent } from "../entity/Event";
import { EventInput, EventObject } from "../inputs/EventInputs";
import { EventService } from "../services/EventService";

@Controller("/events")
export class EventController {
  constructor(private eventService: EventService) {}

  @Get("/", { description: "Get familly events" })
  @Authorized()
  async getEvents(
    @Ctx { res }: ContextType,
    @Query("startRange") startRange: string,
    @Query("endRange") endRange: string
  ): HttpResponse<EventObject[]> {
    console.log(startRange, endRange);

    const { famillyId } = res.locals.user;
    if (startRange && endRange) {
      const data = await this.eventService.getEventsBetweenDates(
        famillyId,
        startRange,
        endRange
      );
      return { code: 200, data };
    }
    const data = await this.eventService.getEvents(famillyId);
    return { code: 200, data };
  }

  @Post("/", { description: "Create a new Event" })
  @Authorized()
  async createEvent(
    @Ctx { res }: ContextType,
    @Body { assigned_to, endDate, location, name, startDate }: EventInput
  ): HttpResponse<IEvent> {
    const data = await this.eventService.createEvent(
      {
        endDate,
        assigned_to,
        location,
        name,
        startDate,
      },
      res.locals.user
    );
    return { code: 201, data };
  }

  @Get("/:id")
  @Authorized()
  async getEvent(
    @Param("id") eventId: string,
    @Ctx { res }: ContextType
  ): HttpResponse<EventObject> {
    const { famillyId } = res.locals.user;
    const event = await this.eventService.getEvent(famillyId, eventId);
    if (!event) return { code: 404, error: "Event not found" };
    return { code: 200, data: event };
  }

  @Patch("/:id")
  @Authorized()
  async patchEvent(
    @Body { assigned_to, endDate, location, name, startDate }: EventInput,
    @Ctx { res }: ContextType,
    @Param("id") eventId: string
  ): HttpResponse<EventObject> {
    const { famillyId, _id, role } = res.locals.user;
    const data = await this.eventService.patchEvent(
      famillyId,
      eventId,
      {
        assigned_to,
        endDate,
        location,
        name,
        startDate,
      },
      { _id, role }
    );
    if (!data) return { code: 403, error: "Not authorized" };
    return { code: 201, data };
  }

  @Delete("/:id")
  @Authorized()
  async deleteEvent(
    @Ctx { res }: ContextType,
    @Param("id") eventId: string
  ): HttpResponse<null> {
    const { famillyId } = res.locals.user;
    await this.eventService.deleteEvent(eventId, famillyId);
    return { code: 204, data: null };
  }
}
