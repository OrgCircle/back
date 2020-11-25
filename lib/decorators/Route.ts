import "reflect-metadata";
import { getAPIMetadataStorage } from "../metadatas/metadataStorage";
import { Route } from "../metadatas/metadatasTypes";

type RouteOptions = {
  description: string;
};

export const Get = (path: string, options?: RouteOptions): MethodDecorator => {
  return (target, key) => {
    registerRoute(
      {
        key: key,
        target: target.constructor,
        path,
        method: "GET",
      },
      options
    );
  };
};

export const Post = (path: string, options?: RouteOptions): MethodDecorator => {
  return (target, key) => {
    registerRoute(
      {
        key,
        target: target.constructor,
        path,
        method: "POST",
      },
      options
    );
  };
};

export const Put = (path: string, options?: RouteOptions): MethodDecorator => {
  return (target, key) => {
    registerRoute(
      {
        key: key,
        target: target.constructor,
        path,
        method: "PUT",
      },
      options
    );
  };
};

export const Patch = (
  path: string,
  options?: RouteOptions
): MethodDecorator => {
  return (target, key) => {
    registerRoute(
      {
        key: key,
        target: target.constructor,
        path,
        method: "PATCH",
      },
      options
    );
  };
};

export const Delete = (
  path: string,
  options?: RouteOptions
): MethodDecorator => {
  return (target, key) => {
    registerRoute(
      {
        key: key,
        target: target.constructor,
        path,
        method: "DELETE",
      },
      options
    );
  };
};

const registerRoute = (
  {
    key,
    target,
    path,
    method,
  }: Pick<Route, "key" | "target" | "path" | "method">,
  options: RouteOptions
) => {
  const description = options && options.description ? options.description : "";

  getAPIMetadataStorage().addEndpoint({
    key,
    target,
    path,
    method,
    description,
  });
};
