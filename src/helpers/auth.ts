import { verify } from "jsonwebtoken";
import { AuthorizedFunction } from "../../lib";
import { JWT_SECRET } from "../config/keys";
import Familly from "../entity/Familly";
import { JWTPayload } from "./jwt";

export const auth: AuthorizedFunction = async (roles, { req, res }) => {
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
};
