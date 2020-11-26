import { Service } from "../../lib";
import Familly, { FamillyInput, IFamilly } from "../entity/Familly";
import { hash } from "bcryptjs";

@Service()
export class FamillyService {
  getAllFamillies(): Promise<IFamilly[]> {
    return Familly.find().populate("profiles", "name").exec();
  }

  getFamillyById(id: string): Promise<IFamilly> {
    return Familly.findById(id).exec();
  }

  async createFamilly(famillyInput: FamillyInput): Promise<IFamilly> {
    try {
      famillyInput.password = await this.hashPassword(famillyInput.password);
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

  async deleteFamillyById(id: string): Promise<IFamilly> {
    return await Familly.findOneAndDelete({ _id: id }).exec();
  }

  async updateFamillyById(id: string, familly: Partial<IFamilly>) {
    familly.password = await this.hashPassword(familly.password);
    return await Familly.findOneAndUpdate({ _id: id }, familly, {
      new: true,
    });
  }

  private async hashPassword(pass: string): Promise<string | null> {
    if (!pass) return null;
    return await hash(pass, 4);
  }
}
