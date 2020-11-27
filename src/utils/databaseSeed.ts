import Familly from "../entity/Familly";
import { hashPassword } from "../helpers/password";
// import Profile from "../entity/Profile";
import List from "../entity/List";

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

  const list = new List({
    name: "Chores",
    content: [
      { label: "Dishes", state: true },
      {
        label: "Gardening",
        state: false,
      },
    ],
    listType: { label: "Chores", icon: "list.jpg" },
  });

  const list2 = new List({
    name: "Chores2",
    content: [
      {
        label: "Dishes2",
        state: true,
      },
      {
        label: "Gardening2",
        state: false,
      },
    ],
    listType: { label: "Chores", icon: "list.jpg" },
  });

  await list.save();
  await list2.save();
}
