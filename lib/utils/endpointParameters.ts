import { Request, Response } from "express";
import Container from "typedi";
import {
  BODY_METADATA_KEY,
  CTX_METADATA_KEY,
  PARAMS_METADATA_KEY,
  QUERY_METADATA_KEY,
} from "../metadatas/symbols";
import { RouteMetadataType } from "../types/RouteMetadataType";

export function endpointParameters(
  controller: Function,
  route: RouteMetadataType
) {
  const endPoint: Function = controller.prototype[route.key].bind(
    Container.get(controller)
  );

  const queryParameters: Array<{ queryParameter: string; index: number }> =
    Reflect.getOwnMetadata(QUERY_METADATA_KEY, controller, route.key) || [];
  const bodyParameters: Array<{ index: number }> =
    Reflect.getOwnMetadata(BODY_METADATA_KEY, controller, route.key) || [];
  const paramsParameters: Array<{ paramName: string; index: number }> =
    Reflect.getOwnMetadata(PARAMS_METADATA_KEY, controller, route.key) || [];
  const ctxParameters: Array<{ index: number }> =
    Reflect.getOwnMetadata(CTX_METADATA_KEY, controller, route.key) || [];

  return async function (req: Request, res: Response) {
    const args: any[] = [];

    queryParameters.forEach((query) => {
      args[query.index] = req.query[query.queryParameter];
    });

    bodyParameters.forEach((query) => {
      args[query.index] = req.body;
    });

    paramsParameters.forEach((query) => {
      args[query.index] = req.params[query.paramName];
    });

    ctxParameters.forEach((query) => {
      args[query.index] = { req, res };
    });

    const test = await endPoint(...args);
    res.json(test);
  };
  // return endPointOverride;
}
