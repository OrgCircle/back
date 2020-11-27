import { Body, Controller, Delete, Get, Param, Post, Put } from "../../lib";
import { ListInput } from "../entity/List";
import { ListService } from "../services/ListService";

@Controller("/list")
export class ListController {
  constructor(private ListService: ListService) {}

  @Get("/", { description: "Return all lists in database" })
  async getLists() {
    return await this.ListService.getAllLists();
  }

  @Get("/:id", { description: "Return the list matching the id" })
  async getList(@Param("id") id: string) {
    return await this.ListService.getListById(id);
  }

  @Post("/", { description: "Create a list" })
  async postList(@Body { name, content, listType }: ListInput) {
    console.log(content, listType);
    const insertedList = await this.ListService.createList({
      name,
      content,
      listType,
    });

    return insertedList;
  }

  @Put("/:id", { description: "Edit the list matching the id" })
  async putList(
    @Param("id") id: string,
    @Body { name, content, listType }: ListInput
  ) {
    const updatedList = await this.ListService.updateListById(id, {
      name,
      content,
      listType,
    });

    return updatedList;
  }

  @Delete("/:id", { description: "Delete the list matching the id" })
  async deleteList(@Param("id") id: string) {
    const List = await this.ListService.deleteListById(id);
    return List;
  }
}
