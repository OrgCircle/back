import express from "express";
import bodyParser from "body-parser";
import { BuildAPI } from "../lib";
// import { seedDatabase } from "./utils/databaseSeed";
import { connect } from "mongoose";
import { controllers } from "./controllers";
import cors from "cors";
import { auth } from "./helpers/auth";
require("dotenv").config();

const PORT = process.env.PORT || 5000;
async function main() {
  try {
    console.info("Connecting to database...");
    // const conn =
    await connect(process.env.MONGO_URL, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    // await conn.connection.db.dropDatabase();

    // console.info("Seeding database ...");
    // await seedDatabase();

    const app = express();
    app.set("views", "/app/build/lib/doc/");
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    const { router, apiUrl, docUrl } = BuildAPI({
      controllers,
      auth,
    });

    app.use(router);

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}${apiUrl}`);
      console.log(`Doc started on http://localhost:${PORT}${docUrl}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}

main();
