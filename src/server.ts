import express from "express";
import bodyParser from "body-parser";
import { BuildAPI } from "../lib";
import { seedDatabase } from "./utils/databaseSeed";
import { connect } from "mongoose";
import { controllers } from "./controllers";
import cors from "cors";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./config/keys";
import { JWTPayload } from "./helpers/jwt";
import Familly from "./entity/Familly";

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

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    const { router, apiUrl, docUrl } = BuildAPI({
      controllers,
      auth: async (roles, { req, res }) => {
        try {
          const auth = req.headers.authorization;
          if (!auth) return false;
          const token = auth.replace("Bearer ", "");

          const decoded = verify(token, JWT_SECRET) as JWTPayload;

          if (decoded) {
            const familly = await Familly.findOne({
              _id: decoded.famillyId,
              profiles: {
                $elemMatch: {
                  _id: decoded._id,
                },
              },
            });

            if (!familly) return false;
            res.locals.user = decoded;
            if (!roles) return true;
          }

          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
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
