import "reflect-metadata";
import { MetadataOptions } from "..";
import { RESPONSE_FIELD_METADATA_KEY } from "../metadatas/symbols";

/**
 * @description Reponse object to generate auto docs
 */
export const Response: ClassDecorator = (target) => {
  const extendedTarget: Function = Object.getPrototypeOf(target); // get estended class
  collectResponseFields(target, extendedTarget);
};

const collectResponseFields = (
  baseTarget: Function,
  currentTarget: Function
) => {
  if (currentTarget.prototype) {
    const metas: Array<MetadataOptions> = Reflect.getOwnMetadata(
      RESPONSE_FIELD_METADATA_KEY,
      currentTarget
    );
    const nextTarget: Function = Object.getPrototypeOf(currentTarget);

    const existingMetadata: Array<MetadataOptions> =
      Reflect.getOwnMetadata(RESPONSE_FIELD_METADATA_KEY, baseTarget) || [];

    Reflect.defineMetadata(
      RESPONSE_FIELD_METADATA_KEY,
      [...existingMetadata, ...metas],
      baseTarget
    );
    if (nextTarget.prototype) {
      collectResponseFields(baseTarget, nextTarget);
    }
  }
};
