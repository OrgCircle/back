import { Service } from "../../lib";
import Familly from "../entity/Familly";

@Service()
export class FamillyService {
  async getAllFamillies() {
    return await Familly.find().populate("profiles", "name").exec();
  }
}
