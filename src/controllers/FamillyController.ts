import { Body, Controller, Delete, Get, Param, Post, Put } from "../../lib";
import { FamillyInput, FamillyObject } from "../entity/Familly";
import { FamillyService } from "../services/FamillyService";

@Controller("/familly")
export class FamillyController {
  constructor(private famillyService: FamillyService) {}

  @Get("/", { description: "Return all families in database" })
  async getFamillies() {
    const allFamilies = await this.famillyService.getAllFamillies();
    return allFamilies;
  }

  @Get("/:id", { description: "Return the familly matching the id" })
  async getFamilly(@Param("id") id: string) {
    const familly = await this.famillyService.getFamillyById(id);
    return familly;
  }

  @Post("/", { description: "Create a familly" })
  async postFamilly(@Body familly: FamillyInput) {
    const createFamilly = await this.famillyService.createFamilly(familly);
    console.log(createFamilly);

    return createFamilly;
  }

  @Put("/:id", { description: "Edit the familly matching the id" })
  putFamilly(@Body body: FamillyInput) {
    return { ...body };
  }

  @Delete("/:id", { description: "Delete the familly matching the id" })
  async deleteFamilly(@Param("id") id: string) {
    const familly = await this.famillyService.deleteFamillyById(id);
    return familly;
  }
}
