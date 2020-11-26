import { Service } from "../../lib";
import Familly from "../entity/Familly";
import { comparePassword, hashPassword } from "../helpers/password";
import { LoginInput, RegisterInput } from "../inputs/AuthenticationInput";

@Service()
export class AuthenticationService {
  async registerFamilly(registerInput: RegisterInput) {
    try {
      registerInput.password = await hashPassword(registerInput.password);
      console.log(registerInput);

      const familly = new Familly({
        name: registerInput.familyName,
        email: registerInput.email,
        profiles: [
          { name: registerInput.username, password: registerInput.password },
        ],
      });

      return await familly.save();
    } catch (error) {
      console.log(error);
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
    });

    const profile = foundFamilly.profiles.find(
      (profile) => profile.name === username
    );

    if (!foundFamilly) return null;
    const isPasswordValid = await comparePassword(password, profile.password);

    if (isPasswordValid) {
      return profile;
    }
    return null;
  }
}
