import "reflect-metadata";
import {
  // responseFieldMetadataKey,
  ROUTE_METADATA_KEY,
} from "../metadatas/symbols";
import { RouteMetadataType } from "../types/RouteMetadataType";

export const Get = (
  endpointUrl: string
  // returnType: () => any
): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, {
      method: "GET",
      endpointUrl,
      key,
    });
  };
};

export const Post = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, {
      method: "POST",
      endpointUrl,
      key,
    });
  };
};

export const Put = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, {
      method: "PUT",
      endpointUrl,
      key,
    });
  };
};

export const Patch = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, {
      method: "PATCH",
      endpointUrl,
      key,
    });
  };
};

export const Delete = (endpointUrl: string): MethodDecorator => {
  return (target, key) => {
    applyRouteMetadata(target.constructor, {
      method: "DELETE",
      endpointUrl,
      key,
    });
  };
};

const applyRouteMetadata = (target: Function, routeMeta: RouteMetadataType) => {
  // const returnT: Function = Reflect.getMetadata(
  //   "design:returntype",
  //   target.prototype,
  //   routeMeta.key
  // );

  // const tmp = Reflect.getOwnMetadata(responseFieldMetadataKey, returnT);

  // console.log(tmp);

  const routes: RouteMetadataType[] =
    Reflect.getOwnMetadata(ROUTE_METADATA_KEY, target) || [];
  routes.push(routeMeta);
  Reflect.defineMetadata(ROUTE_METADATA_KEY, routes, target);
};
