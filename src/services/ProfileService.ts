import { Service } from "typedi";
import Familly from "../entity/Familly";
import { hashPassword } from "../helpers/password";
import { ProfileInput } from "../inputs/ProfileInputs";

@Service()
export class ProfileService {
  async createProfile(profileInput: ProfileInput, famillyId: string) {
    const familly = await Familly.findOne({ _id: famillyId }).exec();
    if (!familly) throw new Error("Familly not found");
    familly.profiles.push({
      name: profileInput.name,
      password: await hashPassword(profileInput.password),
    } as any);
    return await familly.save();
  }
}
