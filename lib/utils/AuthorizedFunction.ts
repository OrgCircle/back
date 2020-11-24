import { BuildApiOptions } from "..";
import { MiddlewareFunction } from "../types/MiddlewareType";

export function AuthorizedFunction(
  authorized: string[],
  options: BuildApiOptions
): MiddlewareFunction {
  return (req, res, next) => {
    if (authorized === undefined) next();
    if (options.auth(authorized, { req, res })) {
      next();
    } else {
      res.status(403).send({ message: "Operation not authorized" });
    }
  };
}
