import { ObjectId } from "mongodb";
import { Service } from "../../lib";
import List, { ListInput, IList } from "../entity/List";
import ListType from "../entity/ListType";
import { ITask, TaskInput } from "../entity/Task";

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
      const list = new List({
        ...listInput,
        famillyId,
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

  async updateTask(
    famillyId: string,
    taskId: string,
    listId: string,
    { label, state }: TaskInput
  ) {
    const task: Partial<TaskInput> & { _id: string } = { _id: taskId };
    if (label !== undefined) task.label = label;
    if (state !== undefined) task.state = state;

    return List.findOneAndUpdate(
      { famillyId, _id: listId, "content._id": taskId },
      {
        $set: {
          "content.$": task,
        },
      },
      { new: true }
    );
  }

  async deleteTask(famillyId: string, taskId: string, listId: string) {
    return await List.findOneAndUpdate(
      { famillyId, _id: listId, "content._id": taskId },
      {
        $pull: {
          content: {
            _id: new ObjectId(taskId),
          },
        },
      },
      { new: true }
    );
  }

  async createTask(
    famillyId: string,
    listId: string,
    { label, state }: TaskInput
  ) {
    return List.findByIdAndUpdate(
      { famillyId, _id: listId },
      {
        $push: {
          content: { label, state } as ITask,
        },
      },
      { new: true }
    );
  }

  async getListTypes() {
    return await ListType.find();
  }
}
