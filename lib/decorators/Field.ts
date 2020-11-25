import "reflect-metadata";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

type FieldOptions = {
  description?: string;
  nullable?: boolean;
};

export type MetadataOptions = {
  key: string | symbol;
  type: string;
} & FieldOptions;

export const Field = (options?: FieldOptions): PropertyDecorator => {
  return (target, key) => {
    const type: Function = Reflect.getMetadata("design:type", target, key);
    const nullable =
      options === undefined || options.nullable === undefined
        ? false
        : options.nullable;

    const description =
      options === undefined || options.description === undefined
        ? ""
        : options.description;

    getAPIMetadataStorage().addField(
      { target: target.constructor, key },
      {
        name: key,
        type: type.name,
        nullable,
        description,
      }
    );
  };
};
