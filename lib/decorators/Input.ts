import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

/**
 * Define properties to set on body
 * @param target
 */
export const Input: ClassDecorator = (target) => {
  getAPIMetadataStorage().addType({ target });
  const extendedTarget: Function = Object.getPrototypeOf(target); // get estended class
  collectInputFields(target, extendedTarget);
};

const collectInputFields = (baseTarget: Function, currentTarget: Function) => {
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
      collectInputFields(baseTarget, nextTarget);
    }
  }
};
