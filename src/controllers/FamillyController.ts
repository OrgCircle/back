import { Body, Controller, Delete, Get, Param, Put } from "../../lib";
import { FamillyInput } from "../inputs/FamillyInputs";
import { FamillyService } from "../services/FamillyService";

@Controller("/familly")
export class FamillyController {
  constructor(private famillyService: FamillyService) {}

  @Get("/", { description: "Return all families in database" })
  async getFamillies() {
    return await this.famillyService.getAllFamillies();
  }

  @Get("/:id", { description: "Return the familly matching the id" })
  async getFamilly(@Param("id") id: string) {
    return await this.famillyService.getFamillyById(id);
  }

  @Put("/:id", { description: "Edit the familly matching the id" })
  async putFamilly(
    @Param("id") id: string,
    @Body { email, name }: FamillyInput
  ) {
    const updatedFamilly = await this.famillyService.updateFamillyById(id, {
      email,
      name,
    });

    return updatedFamilly;
  }

  @Delete("/:id", { description: "Delete the familly matching the id" })
  async deleteFamilly(@Param("id") id: string) {
    const familly = await this.famillyService.deleteFamillyById(id);
    return familly;
  }
}
