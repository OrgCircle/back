import { Service } from "typedi";
import Familly from "../entity/Familly";
import { IProfile } from "../entity/Profile";
import { ObjectId } from "mongodb";
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
      role: "USER",
    } as IProfile);
    return await familly.save();
  }

  async deleteProfile(profileId: string, famillyId: string) {
    return await Familly.findOneAndUpdate(
      { _id: famillyId, "profiles._id": profileId },
      {
        $pull: {
          profiles: {
            _id: new ObjectId(profileId),
          },
        },
      },
      { new: true }
    );
  }
}
