import { Field } from "../../lib";
import { Input } from "../../lib/decorators/Input";
import { IFamilly } from "../entity/Familly";

abstract class AuthFragment implements Partial<IFamilly> {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@Input
export class LoginInput extends AuthFragment implements Partial<IFamilly> {}

@Input
export class RegisterInput extends AuthFragment implements Partial<IFamilly> {
  @Field({})
  familyName: string;

  @Field({})
  verifyPassword: string;
}
