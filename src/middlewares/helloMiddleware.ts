import { MiddlewareFunction } from "../../lib/";

export const helloMiddlware: MiddlewareFunction = (_req, _res, next) => {
  //The code
  next();
};
