import express from "express";
import { HelloController } from "./controllers/HelloController";
import bodyParser from "body-parser";
import { BuildAPI } from "../lib";
import { seedDatabase } from "./utils/databaseSeed";
import { connect } from "mongoose";

async function main() {
  try {
    console.info("Connecting to database...");
    const conn = connect("mongodb://localhost/circle-fullstack", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    await (await conn).connection.db.dropDatabase();

    console.info("Seeding database ...");
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
