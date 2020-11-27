import { Router } from "express";
import { generateApiDoc } from "../doc/apiDoc";
import { generateRoutes } from "../utils/routeUtils";
import { AuthorizedFunction } from "./Autorized";

export interface BuildApiOptions {
  baseUrl?: string;
  generateDocs?: boolean;
  docsUrl?: string;
  controllers: Array<Function>;
  auth?: AuthorizedFunction;
}

interface BuildApiObject {
  router: Router;
  apiUrl: string;
  docUrl: string;
}

export const BuildAPI = (options: BuildApiOptions): BuildApiObject => {
  const router = Router({ caseSensitive: true });

  //Define default values
  options.baseUrl = options.baseUrl ?? "/api";
  options.generateDocs = options.generateDocs ?? true;
  options.docsUrl = options.docsUrl ?? "/api/doc";

  generateRoutes(router, options);

  if (options.generateDocs) {
    generateApiDoc(router, options.docsUrl);
  }

  return { router, apiUrl: options.baseUrl, docUrl: options.docsUrl };
};
