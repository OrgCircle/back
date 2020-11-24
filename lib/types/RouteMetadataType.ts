import { HTTPMethod } from "./HttpMethods";

export interface RouteMetadataType {
  /**
   * @description Http Method
   */
  method: HTTPMethod;

  /**
   * @description The url
   */
  endpointUrl: string;

  /**
   * @description The methode name
   */
  key: string | symbol;
}
