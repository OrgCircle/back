import { Service } from "../../lib";
import List, { ListInput, IList } from "../entity/List";

@Service()
export class ListService {
  getAllLists(): Promise<IList[]> {
    return List.find().exec();
  }

  getListById(id: string): Promise<IList> {
    return List.findById(id).exec();
  }

  async createList(listInput: ListInput): Promise<IList> {
    try {
      console.log(listInput);
      const list = new List({
        ...listInput,
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

  async deleteListById(id: string): Promise<IList> {
    return await List.findOneAndDelete({ _id: id }).exec();
  }

  async updateListById(id: string, list: Partial<IList>) {
    return await List.findOneAndUpdate({ _id: id }, list, {
      new: true,
    });
  }
}
