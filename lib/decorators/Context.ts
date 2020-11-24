import { Request, Response } from "express";
import { CTX_METADATA_KEY } from "../metadatas/symbols";

export type ContextType = { req: Request; res: Response };

/**
 * @Context {req,res} : ContextType
 * is the request and the response
 */

export const Ctx: ParameterDecorator = (target, key, index) => {
  const prevMetadatas =
    Reflect.getOwnMetadata(CTX_METADATA_KEY, target.constructor, key) || [];

  prevMetadatas.push({ index });

  Reflect.defineMetadata(
    CTX_METADATA_KEY,
    prevMetadatas,
    target.constructor,
    key
  );
};
