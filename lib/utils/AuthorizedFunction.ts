import { BuildApiOptions } from "..";
import { MiddlewareFunction } from "../types/MiddlewareType";

export function AuthorizedFunction(
  authorized: string[],
  options: BuildApiOptions
): MiddlewareFunction {
  return (req, res, next) => {
    if (options.auth === undefined) return next();
    if (options.auth(authorized, { req, res })) {
      return next();
    } else {
      res.status(403).send({ message: "Operation not authorized" });
    }
  };
}
