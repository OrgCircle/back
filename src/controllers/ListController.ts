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
import { JWTPayload } from "../helpers/jwt";
import { ListService } from "../services/ListService";

@Controller("/list")
export class ListController {
  constructor(private listService: ListService) {}

  @Get("/", { description: "Return all lists in database" })
  @Authorized()
  async getLists(@Ctx { res }: ContextType): HttpResponse<ListObject[]> {
    const { famillyId }: JWTPayload = res.locals.user;
    const lists = await this.listService.getAllLists(famillyId);
    return { code: 200, data: lists };
  }

  @Get("/:id", { description: "Return the list matching the id" })
  @Authorized()
  async getList(
    @Param("id") id: string,
    @Ctx { res }: ContextType
  ): HttpResponse<ListObject> {
    const { famillyId }: JWTPayload = res.locals.user;
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
    console.log(content, listType);
    const { famillyId }: JWTPayload = res.locals.user;
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
    const { famillyId }: JWTPayload = res.locals.user;
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
    const { famillyId }: JWTPayload = res.locals.user;
    await this.listService.deleteListById(id, famillyId);
    return { code: 204, data: null };
  }
}
