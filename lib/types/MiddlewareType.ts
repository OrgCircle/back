import { NextFunction, Request, Response } from "express";

export type MiddlewareMetadataType = Function;

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
