import { Field } from "../../lib";
import { Input } from "../../lib/decorators/Input";
import { IFamilly } from "../entity/Familly";

@Input
export class LoginInput implements Partial<IFamilly> {
  @Field({})
  email: string;

  @Field({})
  password: string;
}

@Input
export class RegisterInput implements Partial<IFamilly> {
  @Field({})
  name: string;

  @Field({})
  email: string;

  @Field({})
  password: string;

  @Field({})
  verifyPassword: string;
}
