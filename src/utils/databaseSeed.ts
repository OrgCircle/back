import Familly from "../entity/Familly";
import Profile from "../entity/Profile";
import { Types } from "mongoose";
export async function seedDatabase() {
  // Create familly
  const familly = new Familly({
    _id: new Types.ObjectId(),
    name: "DOE",
    email: "familly@doe.usa",
    password: "passwordToPut",
  });

  const defaultProfile = new Profile({
    _id: new Types.ObjectId(),
    name: "John",
    photoUrl: "path",
    password: "shityPassword",
    familly: familly,
  });

  familly.profiles = [defaultProfile];

  await familly.save();
  await defaultProfile.save();
}
