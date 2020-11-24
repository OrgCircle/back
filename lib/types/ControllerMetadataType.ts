import { RouteMetadataType } from "./RouteMetadataType";

export interface ControllerMetadataType {
  /**
   * @description Base url of all the routes defined in the controller
   */
  controllerUrl: string;

  /**
   * @description All routes with "GET" Methode
   */
  routes?: RouteMetadataType[];
}
