import express from "express";
import { HelloController } from "./controllers/HelloController";
import bodyParser from "body-parser";
import { BuildAPI } from "../lib";
import { createConnection } from "typeorm";
import { seedDatabase } from "./utils/databaseSeed";

async function main() {
  try {
    console.info("Server is starting ...");
    await createConnection();
    console.info("Database is connected ...");
    await seedDatabase();

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    const { router } = BuildAPI({
      controllers: [HelloController],
      auth: () => {
        return true;
      },
    });

    app.use(router);

    app.listen(5000, () => {
      console.log("Server started on http://localhost:5000");
    });
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}

main();
