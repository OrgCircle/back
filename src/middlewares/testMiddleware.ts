import { MiddlewareFunction } from "../../src/types/MiddlewareType";

export const testMiddlware: MiddlewareFunction = (_req, _res, next) => {
  //The code
  next();
};
