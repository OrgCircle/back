import { Service } from "../../lib";
import List, { ListInput, IList } from "../entity/List";

@Service()
export class ListService {
  getAllLists(famillyId: string): Promise<IList[]> {
    return List.find({ famillyId }).exec();
  }

  getListById(id: string, famillyId: string): Promise<IList> {
    return List.findOne({ famillyId, _id: id }).exec();
  }

  async createList(listInput: ListInput, famillyId: string): Promise<IList> {
    try {
      console.log(listInput);
      const list = new List({
        ...listInput,
        famillyId,
        /*name: listInput.name,
        content: JSON.parse(listInput.content as any),
        listType: JSON.parse(listInput.listType as any),*/
      });

      return await list.save();
    } catch (error) {
      console.log(error);
      throw new Error("List creation failed");
    }
  }

  async deleteListById(id: string, famillyId: string): Promise<IList> {
    return await List.findOneAndDelete({ _id: id, famillyId }).exec();
  }

  async updateListById(id: string, list: Partial<IList>, famillyId: string) {
    return await List.findOneAndUpdate({ _id: id, famillyId }, list, {
      new: true,
    });
  }
}
