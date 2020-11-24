import Familly from "../entity/Familly";
import Profile from "../entity/Profile";
import { Types } from "mongoose";
export async function seedDatabase() {
  const familly = new Familly({
    _id: new Types.ObjectId(),
    name: "DOE",
    email: "familly@doe.usa",
    password: "passwordToPut",
  });

  const savedFamilly = await familly.save();

  const defaultProfile = new Profile({
    _id: new Types.ObjectId(),
    name: "John",
    photoUrl: "path",
    password: "shityPassword",
    familly: savedFamilly,
  });

  await defaultProfile.save();
  await savedFamilly.updateOne({ profiles: [defaultProfile] });

  const famillyFound = await Familly.findOne().populate("profiles");
  console.log(famillyFound);
}
