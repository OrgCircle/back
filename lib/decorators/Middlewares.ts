import { getAPIMetadataStorage } from "../metadatas/metadataStorage";
import { MiddlewareFunction } from "../types/MiddlewareType";

/**
 * @description Middleware decorator
 * @param middlwares all miffdlware function to execute before
 * @
 */
export const Middlewares = (
  middlewares: MiddlewareFunction[] | MiddlewareFunction
): MethodDecorator => {
  return (target, key) => {
    const mids = Array.isArray(middlewares) ? middlewares : [middlewares];
    getAPIMetadataStorage().addMiddleware(mids, {
      target: target.constructor,
      key,
    });
  };
};
