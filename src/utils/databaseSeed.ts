import { Familly } from "../entity/User";
import { getMongoRepository } from "typeorm";

export async function seedDatabase() {
  const famillyRepository = getMongoRepository(Familly);
  const familly = famillyRepository.create({
    name: "DOE",
    email: "familly@doe.usa",
    password: "shityPassword",
  });

  famillyRepository.save(familly);
}
