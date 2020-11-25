import { Body, Controller, Delete, Get, Param, Post, Put } from "../../lib";
import { FamillyService } from "../services/FamillyService";

@Controller("/familly")
export class FamillyController {
  constructor(private famillyService: FamillyService) {}

  @Get("/")
  async getFamillies() {
    const allFamilies = await this.famillyService.getAllFamillies();
    return allFamilies;
  }

  @Get("/:id")
  async getFamilly(@Param("id") id: string) {
    const familly = await this.famillyService.getFamillyById(id);
    return familly;
  }

  @Post("/")
  async postFamilly(@Param("id") id: string) {
    return { id };
  }

  @Put("/:id")
  putFamilly(@Body body: any) {
    return { ...body };
  }

  @Delete("/:id")
  async deleteFamilly(@Param("id") id: string) {
    return { id };
  }
}
