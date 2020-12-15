import { Service } from "../../lib";
import Familly from "../entity/Familly";
import { JWTPayload } from "../helpers/jwt";
import { comparePassword, hashPassword } from "../helpers/password";
import { LoginInput, RegisterInput } from "../inputs/AuthenticationInput";

@Service()
export class AuthenticationService {
  async registerFamilly(registerInput: RegisterInput) {
    try {
      registerInput.password = await hashPassword(registerInput.password);

      const familly = new Familly({
        name: registerInput.familyName,
        email: registerInput.email,
        profiles: [
          { name: registerInput.username, password: registerInput.password },
        ],
      });

      return await familly.save();
    } catch (error) {
      throw new Error("Familly creation failed");
    }
  }

  async loginFamilly({ email, password, username }: LoginInput) {
    const foundFamilly = await Familly.findOne({
      email,
      profiles: {
        $elemMatch: {
          name: username,
        },
      },
    })
      .select("+profiles.password")
      .exec();

    if (!foundFamilly) return null;

    const profile = foundFamilly.profiles.find(
      (profile) => profile.name === username
    );

    const isPasswordValid = await comparePassword(password, profile.password);
    profile.password = undefined;

    const { name, _id, photoUrl, role } = profile;
    if (isPasswordValid) {
      return { name, _id, photoUrl, famillyId: foundFamilly._id, role };
    }
    return null;
  }

  async getAccountInfo({ name, famillyId }: JWTPayload) {
    const foundFamilly = await Familly.findOne({
      _id: famillyId,
      profiles: {
        $elemMatch: {
          name,
        },
      },
    });

    if (!foundFamilly) return null;

    const profile = foundFamilly.profiles.find(
      (profile) => profile.name === name
    );

    return { family: foundFamilly, profile };
  }
}
