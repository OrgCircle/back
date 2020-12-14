import { MiddlewareFunction } from "../types/MiddlewareType";
import { Controller, Field, Route, Type } from "./metadatasTypes";
const globalAny: any = global;

export function getAPIMetadataStorage(): MetadataStorage {
  if (!globalAny.apiFrameworkMetadatas) {
    globalAny.apiFrameworkMetadatas = new MetadataStorage();
  }
  return globalAny.apiFrameworkMetadatas;
}

type RouteBasicID = { target: Function; key: string | symbol };

class MetadataStorage {
  readonly controllers: Controller[] = [];
  readonly types: Type[] = [];
  readonly routes: Route[] = [];

  addMiddleware(handler: MiddlewareFunction[], { target, key }: RouteBasicID) {
    const routeIndex = this.findRouteOrCreate({ target, key });
    const route = this.routes[routeIndex];
    const handlers = route.handlers || [];

    this.routes[routeIndex] = {
      ...route,
      handlers: [...handlers, ...handler],
    };
  }

  addAuthHandler(roles: string | string[], { target, key }: RouteBasicID) {
    const routeIndex = this.findRouteOrCreate({ target, key });
    this.routes[routeIndex].authRoles = roles ?? null;
  }

  addEndpoint(route: Route) {
    const index = this.findRouteOrCreate({
      target: route.target,
      key: route.key,
    });

    this.routes[index] = { ...this.routes[index], ...route };
  }

  addResponseType(
    { target, key }: RouteBasicID,
    objectName: string,
    isArray: boolean
  ) {
    const index = this.findRouteOrCreate({ key, target });

    const type = this.types.find((type) => type.name === objectName);
    this.routes[index].responseType = { isArray, fields: type.fields };
  }

  findRouteOrCreate({ target, key }: RouteBasicID): number {
    const index = this.routes.findIndex(
      (route) => route.key === key && route.target === target
    );
    if (index === -1) {
      this.routes.push({ key, target });
      return this.routes.length - 1;
    }
    return index;
  }

  addQueryParam(
    { target, key }: RouteBasicID,
    index: number,
    paramName: string
  ) {
    const routeIndex = this.findRouteOrCreate({ target, key });
    const routes = this.routes[routeIndex].queryURLParam || [];
    routes.push({ index, paramName });
    this.routes[routeIndex].queryURLParam = routes;
  }

  addParamUrlParam(
    { target, key }: RouteBasicID,
    index: number,
    paramName: string
  ) {
    const routeIndex = this.findRouteOrCreate({ target, key });
    const routes = this.routes[routeIndex].paramsURLParam || [];
    routes.push({ index, paramName });
    this.routes[routeIndex].paramsURLParam = routes;
  }

  addBodyParam(
    { target, key }: RouteBasicID,
    index: number,
    inputType: string
  ) {
    const routeIndex = this.findRouteOrCreate({ target, key });
    const routes = this.routes[routeIndex].bodyParam || [];
    routes.push({ index, inputType });
    this.routes[routeIndex].bodyParam = routes;
    const inputs = this.routes[routeIndex].inputs || [];
    const type = this.types.find((type) => type.name === inputType);
    if (type) {
      const fields = type.fields;
      inputs.push(...fields);
      this.routes[routeIndex].inputs = inputs;
    }
  }

  addContextParam({ target, key }: RouteBasicID, index: number) {
    const routeIndex = this.findRouteOrCreate({ target, key });
    const routes = this.routes[routeIndex].contextParam || [];
    routes.push({ index });
    this.routes[routeIndex].contextParam = routes;
  }

  addType({ target }: Pick<RouteBasicID, "target">) {
    this.findTypeOrCreate({ target });
  }

  addField({ target, key }: RouteBasicID, options: Field) {
    const index = this.findTypeOrCreate({ target });
    const fields = this.types[index].fields || [];
    fields.push({ ...options, name: key });
    this.types[index].fields = fields;
  }

  findTypeOrCreate({ target }: Pick<RouteBasicID, "target">): number {
    const index = this.types.findIndex((type) => type.name === target.name);
    if (index === -1) {
      this.types.push({ name: target.name, fields: [] });
      return this.types.length - 1;
    }
    return index;
  }
}
