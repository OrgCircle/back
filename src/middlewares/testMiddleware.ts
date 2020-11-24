import { MiddlewareFunction } from "../../lib";

export const testMiddlware: MiddlewareFunction = (_req, _res, next) => {
  //The code
  next();
};
