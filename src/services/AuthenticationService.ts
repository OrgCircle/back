import { Service } from "../../lib";
import Familly from "../entity/Familly";
import { comparePassword, hashPassword } from "../helpers/password";
import { LoginInput } from "../inputs/AuthenticationInput";
import { FamillyInput } from "../inputs/FamillyInputs";

@Service()
export class AuthenticationService {
  async registerFamilly(famillyInput: FamillyInput) {
    try {
      famillyInput.password = await hashPassword(famillyInput.password);
      const familly = new Familly({
        ...famillyInput,
        profiles: [{ name: "Profile 1" }],
      });

      return await familly.save();
    } catch (error) {
      console.log(error);
      throw new Error("Familly creation failed");
    }
  }

  async loginFamilly({ email, password }: LoginInput) {
    const foundFamilly = await Familly.findOne({ email });
    if (!foundFamilly) return null;
    const isPasswordValid = await comparePassword(
      password,
      foundFamilly.password
    );

    if (isPasswordValid) {
      return foundFamilly;
    }
    return null;
  }
}
