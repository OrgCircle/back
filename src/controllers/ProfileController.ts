import {
  Authorized,
  Body,
  ContextType,
  Controller,
  Ctx,
  Delete,
  Get,
  HttpResponse,
  Post,
} from "../../lib";
import { IFamilly } from "../entity/Familly";
import { ProfileInput } from "../inputs/ProfileInputs";
import { ProfileService } from "../services/ProfileService";

@Controller("/profile")
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post("/", { description: "Create new profile" })
  @Authorized()
  async createProfile(
    @Ctx { res }: ContextType,
    @Body { name, password, photoUrl }: ProfileInput
  ): HttpResponse<IFamilly> {
    const { famillyId } = res.locals.user;
    const familly = await this.profileService.createProfile(
      { name, password, photoUrl },
      famillyId
    );

    familly.profiles = familly.profiles.map((profile) => {
      profile.password = undefined;
      return profile;
    });

    return { code: 201, data: familly };
  }

  @Delete("/:id", { description: "Not implemented" })
  async deleteProfile() {
    throw new Error("End point not implemented");
  }

  @Get("/:id", { description: "Not implemented" })
  async getProfile() {
    throw new Error("End point not implemented");
  }
}
