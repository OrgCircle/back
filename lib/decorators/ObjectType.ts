import "reflect-metadata";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

/**
 * @description Reponse object to generate auto docs
 */
export const ObjectType: ClassDecorator = (target) => {
  getAPIMetadataStorage().addType({ target });

  const extendedTarget: Function = Object.getPrototypeOf(target); // get estended class
  collectObjectFields(target, extendedTarget);
};

const collectObjectFields = (baseTarget: Function, currentTarget: Function) => {
  if (currentTarget.prototype) {
    const apiMeta = getAPIMetadataStorage();
    const type = apiMeta.types.find((type) => type.name === currentTarget.name);
    const fields = type.fields;

    fields.forEach((field) => {
      apiMeta.addField(
        { target: baseTarget, key: field.name },
        { ...field, name: field.name }
      );
    });

    const nextTarget: Function = Object.getPrototypeOf(currentTarget);
    if (nextTarget.prototype) {
      collectObjectFields(baseTarget, nextTarget);
    }
  }
};
