import { Body, Controller, Get, HttpResponse, Post } from "../../lib";
import { ProfileObject } from "../entity/Profile";
import { LoginInput, RegisterInput } from "../inputs/AuthenticationInput";
import { FamillyObject } from "../inputs/FamillyInputs";
import { AuthenticationService } from "../services/AuthenticationService";

@Controller("/auth")
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post("/login", { description: "Route to login a familly" })
  async login(
    @Body { email, password, username }: LoginInput
  ): HttpResponse<ProfileObject> {
    const familly = await this.authenticationService.loginFamilly({
      email,
      password,
      username,
    });
    if (!familly) return { code: 404, message: "Family not found" };

    const { name, photoUrl, _id } = familly;
    return { code: 200, data: { name, photoUrl, _id } };
  }

  @Post("/register", { description: "Register a new familly" })
  async postFamilly(
    @Body
    { email, familyName, password, verifyPassword, username }: RegisterInput
  ): HttpResponse<FamillyObject> {
    if (password !== verifyPassword)
      return { code: 400, message: "Password does not match" };

    const familly = await this.authenticationService.registerFamilly({
      email,
      familyName,
      password,
      username,
      verifyPassword,
    });
    const { _id, profiles } = familly;
    const profils = profiles.map((profile) => {
      profile.password = undefined;
      return profile;
    });
    return {
      code: 200,
      data: {
        email,
        _id,
        name: familyName,
        profiles: profils,
      },
    };
  }

  @Get("/getAccountInfos", { description: "Register a new familly" })
  async getAccountInfo(
    @Body { email, familyName, password, verifyPassword }: RegisterInput
  ) {
    if (password !== verifyPassword)
      return { error: "Password does not match" };

    console.log(email, familyName);

    return null;
  }
}
