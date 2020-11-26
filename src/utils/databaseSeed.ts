import Familly from "../entity/Familly";
// import Profile from "../entity/Profile";

export async function seedDatabase() {
  // Create familly

  // const defaultProfile = new Profile({
  //   name: "John",
  //   photoUrl: "path",
  //   password: "shityPassword",
  // });

  const familly = new Familly({
    name: "DOE",
    email: "familly@doe.usa",
    password: "passwordToPut",
    profiles: [{ name: "John" }],
  });

  await familly.save();
}
