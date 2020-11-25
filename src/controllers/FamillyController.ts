import { Body, Controller, Delete, Get, Param, Post, Put } from "../../lib";
import { FamillyInput } from "../entity/Familly";
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

  @Put("/:id")
  putFamilly(@Body body: any) {
    return { ...body };
  }

  @Delete("/:id")
  async deleteFamilly(@Param("id") id: string) {
    return { id };
  }
}
