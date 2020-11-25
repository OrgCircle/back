import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

/**
 * /api/test/:id
 * @Params("id")
 */
export const Param = (paramName: string): ParameterDecorator => (
  target,
  key,
  index
) => {
  getAPIMetadataStorage().addParamUrlParam(
    { target: target.constructor, key },
    index,
    paramName
  );
};
