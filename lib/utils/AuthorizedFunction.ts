// import { BuildApiOptions } from "..";
import { MiddlewareFunction } from "../types/MiddlewareType";

export function AuthorizedFunction(): MiddlewareFunction {
  // authorized: string[],
  // options: BuildApiOptions
  return (_req, _res, next) => {
    // if (authorized === undefined) next();
    // if (options.auth(authorized, { req, res })) {

    // } else {
    //   res.status(403).send({ message: "Operation not authorized" });
    // }
    next();
  };
}
