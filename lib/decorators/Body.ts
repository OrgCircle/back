import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

/**
 * req.body
 */
export const Body: ParameterDecorator = (target, key, index) => {
  const parameters = Reflect.getMetadata("design:paramtypes", target, key);
  getAPIMetadataStorage().addBodyParam(
    { target: target.constructor, key },
    index,
    parameters[index].name
  );
};
