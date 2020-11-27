import Familly from "../entity/Familly";
import { hashPassword } from "../helpers/password";
// import Profile from "../entity/Profile";

export async function seedDatabase() {
  // Create familly

  const password = await hashPassword("hophop");
  const familly = new Familly({
    name: "DOE",
    email: "familly@doe.usa",
    profiles: [
      { name: "John", password },
      { name: "Jean", password },
    ],
  });

  await familly.save();
}
