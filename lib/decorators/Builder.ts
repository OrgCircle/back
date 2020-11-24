import { Router } from "express";
import { CONTROLLER_METADATA_KEY } from "../metadatas/symbols";
import { ControllerMetadataType } from "../types/ControllerMetadataType";
import { generateControllerDoc } from "../utils/controllerDoc";
import { generateRoutes } from "../utils/routeUtils";
import { AuthorizedFunction } from "./Autorized";

export interface BuildApiOptions {
  baseUrl?: string;
  generateDocs?: boolean;
  docsUrl?: string;
  controllers?: Array<Function>;
  globalMiddleware?: Array<any>;
  auth?: AuthorizedFunction;
}

interface BuildApiObject {
  router: Router;
}

export const BuildAPI = (options: BuildApiOptions): BuildApiObject => {
  const router = Router({ caseSensitive: true });

  //Define default values
  options.baseUrl = options.baseUrl ?? "/api";
  options.generateDocs = options.generateDocs ?? true;

  options.controllers.forEach((controller) => {
    const controllerMeta: ControllerMetadataType = Reflect.getOwnMetadata(
      CONTROLLER_METADATA_KEY,
      controller
    );

    generateRoutes(controllerMeta, controller, router, options);

    if (options.generateDocs) {
      generateControllerDoc(
        { controllerMeta, controller },
        { router, ...options }
      );
    }
  });

  return { router };
};
