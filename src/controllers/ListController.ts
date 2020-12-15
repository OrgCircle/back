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
  Post,
  Patch,
} from "../../lib";
import { IList, ListInput, ListObject } from "../entity/List";
import { TaskInput } from "../entity/Task";
import { ListService } from "../services/ListService";

@Controller("/lists")
export class ListController {
  constructor(private listService: ListService) {}

  @Get("/", { description: "Return all lists in database" })
  @Authorized()
  async getLists(@Ctx { res }: ContextType): HttpResponse<ListObject[]> {
    const { famillyId } = res.locals.user;
    const lists = await this.listService.getAllLists(famillyId);
    return { code: 200, data: lists };
  }

  @Get("/:id", { description: "Return the list matching the id" })
  @Authorized()
  async getList(
    @Param("id") id: string,
    @Ctx { res }: ContextType
  ): HttpResponse<ListObject> {
    const { famillyId } = res.locals.user;
    const list = await this.listService.getListById(id, famillyId);
    if (!list) return { code: 404, error: "List not found" };
    return { code: 200, data: list };
  }

  @Post("/", { description: "Create a list" })
  @Authorized()
  async postList(
    @Body { name, content, listType }: ListInput,
    @Ctx { res }: ContextType
  ): HttpResponse<ListObject> {
    const { famillyId } = res.locals.user;
    const insertedList = await this.listService.createList(
      {
        name,
        content,
        listType,
      },
      famillyId
    );

    return { code: 201, data: insertedList };
  }

  @Patch("/:id", { description: "Edit the list matching the id" })
  @Authorized()
  async putList(
    @Param("id") id: string,
    @Body { name, content, listType }: ListInput,
    @Ctx { res }: ContextType
  ): HttpResponse<ListObject> {
    const { famillyId } = res.locals.user;
    const list: Partial<IList> = {};
    if (name) list.name = name;
    if (content) list.content = content;
    if (listType) list.listType = listType;
    const updatedList = await this.listService.updateListById(
      id,
      list,
      famillyId
    );

    return { code: 201, data: updatedList };
  }

  @Delete("/:id", { description: "Delete the list matching the id" })
  @Authorized()
  async deleteList(
    @Param("id") id: string,
    @Ctx { res }: ContextType
  ): HttpResponse<null> {
    const { famillyId } = res.locals.user;
    await this.listService.deleteListById(id, famillyId);
    return { code: 204, data: null };
  }

  @Patch("/:id/task/:taskId", { description: "Patch a single task" })
  @Authorized()
  async patchTask(
    @Body { label, state }: TaskInput,
    @Ctx { res }: ContextType,
    @Param("id") listId: string,
    @Param("taskId") taskId: string
  ): HttpResponse<ListObject> {
    const { famillyId } = res.locals.user;
    const data = await this.listService.updateTask(famillyId, taskId, listId, {
      label,
      state,
    });
    return { code: 201, data };
  }

  @Delete("/:id/task/:taskId", { description: "Delete a single task" })
  @Authorized()
  async deleteTask(
    @Ctx { res }: ContextType,
    @Param("id") listId: string,
    @Param("taskId") taskId: string
  ): HttpResponse<ListObject> {
    const { famillyId } = res.locals.user;
    const data = await this.listService.deleteTask(famillyId, taskId, listId);
    return { code: 201, data };
  }

  @Post("/:id/task", { description: "Add a single task to the list" })
  @Authorized()
  async createTask(
    @Body { label, state }: TaskInput,
    @Ctx { res }: ContextType,
    @Param("id") listId: string
  ): HttpResponse<ListObject> {
    const { famillyId } = res.locals.user;
    const data = await this.listService.createTask(famillyId, listId, {
      label,
      state,
    });
    return { code: 201, data };
  }
}
