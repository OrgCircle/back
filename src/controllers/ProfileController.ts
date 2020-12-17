import {
  Authorized,
  Body,
  ContextType,
  Controller,
  Ctx,
  Param,
  Delete,
  Get,
  HttpResponse,
  Post,
} from "../../lib";
import { IFamilly } from "../entity/Familly";
import { ProfileInput } from "../inputs/ProfileInputs";
import { ProfileService } from "../services/ProfileService";

@Controller("/profiles")
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
  @Authorized()
  async deleteProfile(
    @Ctx { res }: ContextType,
    @Param("id") profileId: string
  ) {
    const { famillyId } = res.locals.user;
    const data = await this.profileService.deleteProfile(profileId, famillyId);
    return { code: 200, data: data };
  }

  @Get("/:id", { description: "Not implemented" })
  async getProfile() {
    throw new Error("End point not implemented");
  }
}
