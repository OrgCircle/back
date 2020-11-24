import "reflect-metadata";
import { CONTROLLER_METADATA_KEY } from "../metadatas/symbols";
import { getControllerRoutes } from "../utils/routeUtils";
import { ControllerMetadataType } from "../types/ControllerMetadataType";

// interface ControllerOptions {}

export const Controller = (controllerUrl: string): ClassDecorator => {
  return (target) => {
    const routes = getControllerRoutes(target);

    const controllerObject: ControllerMetadataType = {
      controllerUrl,
      ...routes,
    };
    Reflect.defineMetadata(CONTROLLER_METADATA_KEY, controllerObject, target);
  };
};
