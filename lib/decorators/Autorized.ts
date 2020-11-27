import { Request, Response } from "express";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

export type AuthorizedFunction = (
  roles: string[] | null,
  context: { req: Request; res: Response }
) => boolean;

export const Authorized = (
  roles: string[] | string = undefined
): MethodDecorator => {
  return (target, key) => {
    getAPIMetadataStorage().addAuthHandler(roles, {
      target: target.constructor,
      key,
    });
  };
};
