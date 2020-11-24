import { Router } from "express";
import { BuildApiOptions } from "..";
import {
  AUTHORIZED_METADATA_KEY,
  MIDDLEWARE_METADATA_KEY,
  ROUTE_METADATA_KEY,
} from "../metadatas/symbols";
import { ControllerMetadataType } from "../types/ControllerMetadataType";
import { MiddlewareFunction } from "../types/MiddlewareType";
import { RouteMetadataType } from "../types/RouteMetadataType";
import { AuthorizedFunction } from "./AuthorizedFunction";
import { endpointParameters } from "./endpointParameters";

export const getControllerRoutes = (
  target: Function
): Pick<ControllerMetadataType, "routes"> => {
  const routes: RouteMetadataType[] = Reflect.getOwnMetadata(
    ROUTE_METADATA_KEY,
    target
  );

  return { routes };
};

export const generateRoutes = (
  { routes, controllerUrl }: ControllerMetadataType,
  controller: Function,
  router: Router,
  options?: BuildApiOptions
) => {
  routes.forEach((route) => {
    const authorized: string[] = Reflect.getOwnMetadata(
      AUTHORIZED_METADATA_KEY,
      controller,
      route.key
    );

    if (authorized && !options.auth)
      throw new Error("Authorized function not provided");

    const authorizedMiddleware: MiddlewareFunction = AuthorizedFunction(
      authorized,
      options
    );

    const middlewares: MiddlewareFunction[] =
      Reflect.getOwnMetadata(MIDDLEWARE_METADATA_KEY, controller, route.key) ||
      [];

    const url = options.baseUrl.concat(controllerUrl.concat(route.endpointUrl));

    const endPointOverride: MiddlewareFunction = endpointParameters(
      controller,
      route
    );

    switch (route.method) {
      case "GET":
        router.get(url, authorizedMiddleware, middlewares, endPointOverride);
        break;
      case "POST":
        router.post(url, authorizedMiddleware, middlewares, endPointOverride);
        break;
      case "DELETE":
        router.delete(url, authorizedMiddleware, middlewares, endPointOverride);
        break;
      case "PUT":
        router.put(url, authorizedMiddleware, middlewares, endPointOverride);
        break;
      case "PATCH":
        router.patch(url, authorizedMiddleware, middlewares, endPointOverride);
        break;
    }
  });
};
