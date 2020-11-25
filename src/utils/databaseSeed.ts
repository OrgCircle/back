import Familly from "../entity/Familly";
import Profile from "../entity/Profile";

export async function seedDatabase() {
  // Create familly
  const familly = new Familly({
    name: "DOE",
    email: "familly@doe.usa",
    password: "passwordToPut",
  });

  const defaultProfile = new Profile({
    name: "John",
    photoUrl: "path",
    password: "shityPassword",
    familly: familly,
  });

  familly.profiles = [defaultProfile];

  await familly.save();
  await defaultProfile.save();
}
