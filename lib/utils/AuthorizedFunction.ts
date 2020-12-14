import { BuildApiOptions } from "..";
import { MiddlewareFunction } from "../types/MiddlewareType";

export function AuthorizedFunction(
  authorized: string[],
  options: BuildApiOptions
): MiddlewareFunction {
  return async (req, res, next) => {
    if (options.auth === undefined) return next();
    const isAuth = await options.auth(authorized, { req, res });

    if (isAuth) {
      return next();
    } else {
      res.status(403).send({ message: "Operation not authorized" });
    }
  };
}
