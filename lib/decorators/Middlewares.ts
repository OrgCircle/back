import { MIDDLEWARE_METADATA_KEY } from "../metadatas/symbols";
import {
  MiddlewareMetadataType,
  MiddlewareFunction,
} from "../types/MiddlewareType";

/**
 * @description Middleware decorator
 * @param middlwares all miffdlware function to execute before
 * @
 */
export const Middlewares = (
  middlewares: MiddlewareFunction[] | MiddlewareFunction
): MethodDecorator => {
  return (target, key) => {
    const ownMiddleware: MiddlewareMetadataType[] =
      Reflect.getOwnMetadata(
        MIDDLEWARE_METADATA_KEY,
        target.constructor,
        key
      ) || [];

    Reflect.defineMetadata(
      MIDDLEWARE_METADATA_KEY,
      [...[middlewares], ...ownMiddleware],
      target.constructor,
      key
    );
  };
};
