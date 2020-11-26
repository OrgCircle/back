import express from "express";
import bodyParser from "body-parser";
import { BuildAPI } from "../lib";
import { seedDatabase } from "./utils/databaseSeed";
import { connect } from "mongoose";
import { controllers } from "./controllers";
import cors from "cors";

async function main() {
  try {
    console.info("Connecting to database...");
    const conn = await connect("mongodb://localhost/circle-fullstack", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    await conn.connection.db.dropDatabase();

    console.info("Seeding database ...");
    await seedDatabase();

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    const { router, apiUrl, docUrl } = BuildAPI({
      controllers,
    });

    app.use(router);

    app.listen(5000, () => {
      console.log(`Server started on http://localhost:5000${apiUrl}`);
      console.log(`Doc started on http://localhost:5000${docUrl}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}

main();
