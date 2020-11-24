import { BuildApiOptions } from "..";
import { MiddlewareFunction } from "../types/MiddlewareType";

export function AuthorizedFunction(
  authorized: string[],
  options: BuildApiOptions
): MiddlewareFunction {
  return (req, res, next) => {
    if (authorized === undefined || options.auth === undefined) return next();
    if (!options.auth(authorized, { req, res })) {
      res.status(403).send({ message: "Operation not authorized" });
    } else {
      return next();
    }
  };
}
