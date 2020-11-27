import { Field, ObjectType } from "../../lib";
import { Input } from "../../lib/decorators/Input";
import { IProfile } from "../entity/Profile";

abstract class ProfileFragment implements Partial<IProfile> {
  @Field({ description: "Name of the familly" })
  name: string;

  @Field({ description: "Email of he familly" })
  photoUrl: string;
}

@Input
export class ProfileInput extends ProfileFragment implements Partial<IProfile> {
  @Field({ description: "Password of the familly account", nullable: true })
  password?: string;
}

@ObjectType
export class ProfileObject
  extends ProfileFragment
  implements Partial<IProfile> {
  @Field({ description: "Object identifier" })
  _id: string;

  @Field({ description: "The token" })
  token?: string;
}
