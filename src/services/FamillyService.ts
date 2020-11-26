import { Service } from "../../lib";
import Familly, { IFamilly } from "../entity/Familly";
import { hashPassword } from "../helpers/password";

@Service()
export class FamillyService {
  getAllFamillies(): Promise<IFamilly[]> {
    return Familly.find().populate("profiles", "name").exec();
  }

  getFamillyById(id: string): Promise<IFamilly> {
    return Familly.findById(id).exec();
  }

  async deleteFamillyById(id: string): Promise<IFamilly> {
    return await Familly.findOneAndDelete({ _id: id }).exec();
  }

  async updateFamillyById(id: string, familly: Partial<IFamilly>) {
    familly.password = await hashPassword(familly.password);
    return await Familly.findOneAndUpdate({ _id: id }, familly, {
      new: true,
    });
  }
}
