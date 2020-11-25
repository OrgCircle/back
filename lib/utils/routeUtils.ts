import { Router } from "express";
import { BuildApiOptions } from "..";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";
import { MiddlewareFunction } from "../types/MiddlewareType";
import { AuthorizedFunction } from "./AuthorizedFunction";
import { endpointParameters } from "./endpointParameters";

export const generateRoutes = (router: Router, options?: BuildApiOptions) => {
  getAPIMetadataStorage().controllers.forEach((controller) => {
    controller.routes.forEach((route) => {
      if (route.authRoles && !options.auth)
        throw new Error("Authorized function not provided");

      const url = options.baseUrl.concat(controller.baseUrl).concat(route.path);
      const authMiddleware: MiddlewareFunction = AuthorizedFunction(
        Array.isArray(route.authRoles) ? route.authRoles : [route.authRoles],
        options
      );

      const { bodyParam, contextParam, paramsURLParam, queryURLParam } = route;

      const endPoint: MiddlewareFunction = endpointParameters(
        { bodyParam, contextParam, paramsURLParam, queryURLParam },
        route
      );

      switch (route.method) {
        case "GET":
          router.get(url, authMiddleware, route.handlers || [], endPoint);
          break;
        case "POST":
          router.post(url, authMiddleware, route.handlers || [], endPoint);
          break;
        case "DELETE":
          router.delete(url, authMiddleware, route.handlers || [], endPoint);
          break;
        case "PUT":
          router.put(url, authMiddleware, route.handlers || [], endPoint);
          break;
        case "PATCH":
          router.patch(url, authMiddleware, route.handlers || [], endPoint);
          break;
      }
    });
  });
};
