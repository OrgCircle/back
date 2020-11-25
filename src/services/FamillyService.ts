import { Service } from "../../lib";
import Familly, { FamillyInput, IFamilly } from "../entity/Familly";
import Profile from "../entity/Profile";

@Service()
export class FamillyService {
  getAllFamillies(): Promise<IFamilly[]> {
    return Familly.find().populate("profiles", "name").exec();
  }

  getFamillyById(id: string): Promise<IFamilly> {
    return Familly.findById(id).exec();
  }

  async createFamilly(familly: FamillyInput): Promise<IFamilly> {
    const createFamilly = new Familly(familly);

    const defaultProfile = new Profile({
      name: "Admin",
      familly: createFamilly,
    });
    createFamilly.profiles = [defaultProfile];
    await defaultProfile.save();
    return await createFamilly.save();
  }

  async deleteFamillyById(id: string): Promise<IFamilly> {
    return await Familly.findOneAndDelete({ _id: id }).exec();
  }
}
