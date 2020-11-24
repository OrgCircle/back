import { BODY_METADATA_KEY } from "../metadatas/symbols";

/**
 * req.body
 */
export const Body: ParameterDecorator = (target, key, index) => {
  const prevMetadatas =
    Reflect.getOwnMetadata(BODY_METADATA_KEY, target.constructor, key) || [];

  prevMetadatas.push({ index });

  Reflect.defineMetadata(
    BODY_METADATA_KEY,
    prevMetadatas,
    target.constructor,
    key
  );
};
