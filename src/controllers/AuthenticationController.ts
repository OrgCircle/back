import { Body, ContextType, Controller, Ctx, Post } from "../../lib";
import { LoginInput, RegisterInput } from "../inputs/AuthenticationInput";
import { AuthenticationService } from "../services/AuthenticationService";

@Controller("/auth")
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post("/login", { description: "Route to login a familly" })
  async login(
    @Body { email, password }: LoginInput,
    @Ctx { res }: ContextType
  ) {
    const foundFamilly = await this.authenticationService.loginFamilly({
      email,
      password,
    });
    res.cookie("test", "test");

    if (foundFamilly) {
      return foundFamilly;
    }
    return { error: "User not found" };
  }

  @Post("/register", { description: "Register a new familly" })
  async postFamilly(
    @Body { email, name, password, verifyPassword }: RegisterInput
  ) {
    if (password !== verifyPassword)
      return { error: "Password does not match" };

    const insertedFamilly = await this.authenticationService.registerFamilly({
      email,
      name,
      password,
    });

    insertedFamilly.password = undefined;
    return insertedFamilly;
  }
}
