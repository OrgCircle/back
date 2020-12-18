import {
  Authorized,
  Body,
  ContextType,
  Controller,
  Ctx,
  Get,
  HttpResponse,
  Post,
} from "../../lib";
import { ProfileObject } from "../inputs/ProfileInputs";
import { LoginInput, RegisterInput } from "../inputs/AuthenticationInput";
import { FamillyObject } from "../inputs/FamillyInputs";
import { AuthenticationService } from "../services/AuthenticationService";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config/keys";
import { JWTPayload } from "../helpers/jwt";
import { ListService } from "../services/ListService";
import { IListType } from "../entity/ListType";

@Controller("/auth")
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService,
    private listService: ListService
  ) {}

  @Post("/login", { description: "Route to login a familly" })
  async login(
    @Body { email, password, username }: LoginInput
  ): HttpResponse<ProfileObject> {
    const profile = await this.authenticationService.loginFamilly({
      email,
      password,
      username,
    });

    if (!profile) return { code: 404, error: "Family not found" };

    const { name, photoUrl, _id, famillyId, role } = profile;

    const payload: JWTPayload = { _id, famillyId, name, role };
    const token = sign(payload, JWT_SECRET);

    return { code: 200, data: { name, photoUrl, _id, token } };
  }

  @Post("/register", { description: "Register a new familly" })
  async postFamilly(
    @Body
    { email, familyName, password, verifyPassword, username }: RegisterInput
  ): HttpResponse<FamillyObject> {
    if (password !== verifyPassword)
      return { code: 400, error: "Password does not match" };

    const familly = await this.authenticationService.registerFamilly({
      email,
      familyName,
      password,
      username,
      verifyPassword,
    });

    const choresType: Partial<IListType> = { icon: "✓", label: "Chores" };
    await this.listService.createList(
      { name: "Chores", content: [], listType: choresType as IListType },
      familly._id
    );

    const shoppingType: Partial<IListType> = { icon: "🛒", label: "Shopping" };
    await this.listService.createList(
      { name: "Shopping", content: [], listType: shoppingType as IListType },
      familly._id
    );

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

  @Get("/accountInfo", {
    description: "Return the account infos according to the token passed",
  })
  @Authorized()
  async getAccountInfos(@Ctx { res }: ContextType): HttpResponse<any> {
    const decoded = res.locals.user;
    const familly = await this.authenticationService.getAccountInfo(decoded);

    if (!familly) return { code: 404, error: "Family does not exist" };

    return { code: 200, data: familly };
  }
}
