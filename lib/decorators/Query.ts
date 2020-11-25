import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

/**
 * /api/test?hello=world
 * @param queryParameter
 * @Query("hello") hello : string
 * hello === "world"
 */
export const Query = (queryParameter: string): ParameterDecorator => (
  target,
  key,
  index
) => {
  getAPIMetadataStorage().addQueryParam(
    { target: target.constructor, key },
    index,
    queryParameter
  );
};
