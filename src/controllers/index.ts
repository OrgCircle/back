import { AuthenticationController } from "../controllers/AuthenticationController";
import { FamillyController } from "../controllers/FamillyController";
import { ListController } from "../controllers/ListController";
import { EventController } from "./EventController";
import { ProfileController } from "./ProfileController";

export const controllers = [
  AuthenticationController,
  FamillyController,
  ListController,
  EventController,
  ProfileController,
];
