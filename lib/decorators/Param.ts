import { PARAMS_METADATA_KEY } from "../metadatas/symbols";

/**
 * /api/test/:id
 * @Params("id")
 */
export const Param = (paramName: string): ParameterDecorator => (
  target,
  key,
  index
) => {
  const prevMetadatas =
    Reflect.getOwnMetadata(PARAMS_METADATA_KEY, target.constructor, key) || [];

  prevMetadatas.push({ paramName, index });

  Reflect.defineMetadata(
    PARAMS_METADATA_KEY,
    prevMetadatas,
    target.constructor,
    key
  );
};
