import Familly from "../entity/Familly";
import { hashPassword } from "../helpers/password";
// import Profile from "../entity/Profile";
import List from "../entity/List";
import Event from "../entity/Event";

export async function seedDatabase() {
  // Create familly

  const password = await hashPassword("hophop");
  const familly = new Familly({
    name: "DOE",
    email: "familly@doe.usa",
    profiles: [
      { name: "John", password, role: "ADMIN" },
      { name: "Jean", password, role: "USER" },
    ],
  });

  const familly2 = new Familly({
    name: "DOE2",
    email: "familly@doe2.usa",
    profiles: [
      { name: "John2", password, role: "ADMIN" },
      { name: "Jean2", password, role: "USER" },
    ],
  });

  await familly.save();
  await familly2.save();

  const list = new List({
    famillyId: familly._id,
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
    famillyId: familly2._id,
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

  await Event.create({
    name: "Aller chez Tom",
    startDate: new Date(),
    assigned_to: [familly.profiles[0]._id, familly.profiles[1]._id],
    created_by: familly.profiles[0]._id,
    endDate: new Date(2020, 12, 24),
    famillyId: familly._id,
    location: "Chez Tom",
  });

  await Event.create({
    name: "Aller chez Tim",
    startDate: new Date(),
    assigned_to: familly.profiles[1]._id,
    created_by: familly.profiles[0]._id,
    endDate: new Date(2020, 12, 31),
    famillyId: familly._id,
    location: "Chez Tim",
  });
}
