/**
 * /api/test?hello=world
 * @param queryParameter
 * @Query("hello") hello : string
 * hello === "world"
 */

import { QUERY_METADATA_KEY } from "../metadatas/symbols";

export const Query = (queryParameter: string): ParameterDecorator => (
  target,
  key,
  index
) => {
  const prevMetadatas =
    Reflect.getOwnMetadata(QUERY_METADATA_KEY, target.constructor, key) || [];

  prevMetadatas.push({ queryParameter, index });

  Reflect.defineMetadata(
    QUERY_METADATA_KEY,
    prevMetadatas,
    target.constructor,
    key
  );
};
