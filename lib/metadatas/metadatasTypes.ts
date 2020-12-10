import { MiddlewareFunction } from "../types/MiddlewareType";

export type HTTPMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export type ParameterType = {
  index: number;
};

export type Route = {
  description?: string;
  method?: HTTPMethod;
  target: Function;
  key: string | symbol;
  path?: string;
  handlers?: MiddlewareFunction[];
  authRoles?: string | string[];
  responseType?: { isArray: boolean; fields: Field[] };
  inputs?: Field[];
  queryURLParam?: Array<{ index: number; paramName: string }>;
  paramsURLParam?: Array<{ index: number; paramName: string }>;
  bodyParam?: Array<{ index: number; inputType: string }>;
  contextParam?: Array<{ index: number }>;
};

export type Controller = {
  target: Function;
  baseUrl: string;
  routes: Route[];
};

export type Field = {
  description?: string;
  type: String;
  nullable: boolean;
  name: string | symbol;
};

export type Type = {
  name: string;
  fields?: Field[];
};

export type Input = {
  name: string;
  fields?: Field[];
};

export type APIMetadatas = {
  controllers: Controller[];
  types: Type[];
  baseUrl: string;
  docUrl: string;
  generateDoc: boolean;
};
