import { Router } from "express";
import { BuildApiOptions } from "..";
// import { RESPONSE_FIELD_METADATA_KEY } from "../metadatas/symbols";
import { ControllerMetadataType } from "../types/ControllerMetadataType";

export const generateControllerDoc = (
  {
    controllerMeta,
  }: // controller,
  { controllerMeta: ControllerMetadataType; controller: Function },
  _props: { router: Router } & BuildApiOptions
) => {
  controllerMeta.routes.forEach((_route) => {
    // const returnT: Function = Reflect.getMetadata(
    //   "design:returntype",
    //   controller.prototype,
    //   route.key
    // );
    // const params: Function = Reflect.getMetadata(
    //   "design:paramtypes",
    //   controller.prototype,
    //   route.key
    // );
    // const returnFields = Reflect.getOwnMetadata(
    //   RESPONSE_FIELD_METADATA_KEY,
    //   returnT
    // );
    // console.log(returnFields);
    // console.log(params);
  });

  //   console.log(controller, props);
};
