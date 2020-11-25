import { Service } from "../../lib";
import Familly, { IFamilly } from "../entity/Familly";

@Service()
export class FamillyService {
  getAllFamillies(): Promise<IFamilly[]> {
    return Familly.find().populate("profiles", "name").exec();
  }

  getFamillyById(id: string): Promise<IFamilly> {
    return Familly.findById(id).exec();
  }
}
