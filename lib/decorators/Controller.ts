import "reflect-metadata";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";

export const Controller = (baseUrl: string): ClassDecorator => {
  return (target) => {
    const apiStorage = getAPIMetadataStorage();
    const routes =
      apiStorage.routes.filter((route) => route.target === target) || [];
    apiStorage.controllers.push({
      baseUrl,
      target,
      routes,
    });
  };
};
