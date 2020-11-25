import { Request, Response } from "express";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

export type ContextType = { req: Request; res: Response };

/**
 * @Context {req,res} : ContextType
 * is the request and the response
 */

export const Ctx: ParameterDecorator = (target, key, index) => {
  getAPIMetadataStorage().addContextParam(
    { target: target.constructor, key },
    index
  );
};
