import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

export const ReturnType = (prop: () => any): MethodDecorator => {
  return (target, key) => {
    const param = prop();
    const isArray = Array.isArray(param);
    if (isArray)
      getAPIMetadataStorage().addResponseType(
        { target: target.constructor, key },
        param[0].name,
        isArray
      );
    else
      getAPIMetadataStorage().addResponseType(
        { target: target.constructor, key },
        param.name,
        isArray
      );
  };
};
