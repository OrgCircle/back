import { Field, ObjectType } from "../../lib";
import { Input } from "../../lib/decorators/Input";
import { IFamilly } from "../entity/Familly";
import { IProfile } from "../entity/Profile";

@Input
export class FamillyInput implements Partial<IFamilly> {
  @Field({ description: "Name of the familly" })
  name: string;

  @Field({ description: "Email of he familly" })
  email: string;

  @Field({ description: "Username og the profile" })
  username: string;

  @Field({ description: "Password of the familly account" })
  password: string;
}

@ObjectType
export class FamillyObject implements Partial<IFamilly> {
  @Field({ description: "Object identifier" })
  _id: string;

  @Field({ description: "Name of the familly" })
  name: string;

  @Field({ description: "Email of he familly" })
  email: string;

  @Field({ description: "Familly profiles" })
  profiles?: Partial<IProfile[]>;
}
