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
import { IList, ListInput } from "../entity/List";
import { JWTPayload } from "../helpers/jwt";
import { ListService } from "../services/ListService";

@Controller("/list")
export class ListController {
  constructor(private ListService: ListService) {}

  @Get("/", { description: "Return all lists in database" })
  @Authorized()
  async getLists(@Ctx { res }: ContextType) {
    const { famillyId }: JWTPayload = res.locals.user;
    return await this.ListService.getAllLists(famillyId);
  }

  @Get("/:id", { description: "Return the list matching the id" })
  @Authorized()
  async getList(@Param("id") id: string, @Ctx { res }: ContextType) {
    const { famillyId }: JWTPayload = res.locals.user;
    return await this.ListService.getListById(id, famillyId);
  }

  @Post("/", { description: "Create a list" })
  @Authorized()
  async postList(
    @Body { name, content, listType }: ListInput,
    @Ctx { res }: ContextType
  ) {
    console.log(content, listType);
    const { famillyId }: JWTPayload = res.locals.user;
    const insertedList = await this.ListService.createList(
      {
        name,
        content,
        listType,
      },
      famillyId
    );

    return insertedList;
  }

  @Patch("/:id", { description: "Edit the list matching the id" })
  @Authorized()
  async putList(
    @Param("id") id: string,
    @Body { name, content, listType }: ListInput,
    @Ctx { res }: ContextType
  ) {
    const { famillyId }: JWTPayload = res.locals.user;
    const list: Partial<IList> = {};
    if (name) list.name = name;
    if (content) list.content = content;
    if (listType) list.listType = listType;
    const updatedList = await this.ListService.updateListById(
      id,
      list,
      famillyId
    );

    return updatedList;
  }

  @Delete("/:id", { description: "Delete the list matching the id" })
  @Authorized()
  async deleteList(
    @Param("id") id: string,
    @Ctx { res }: ContextType
  ): HttpResponse<null> {
    const { famillyId }: JWTPayload = res.locals.user;
    await this.ListService.deleteListById(id, famillyId);
    return { code: 204, data: null };
  }
}
