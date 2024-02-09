import * as express from "express";
import { DeveloperController } from "../controllers";
import { authentication, authorization } from "../middlewares";

const Router = express.Router();

Router.get("/developers", DeveloperController.getAllDevelopers);

Router.post("/developers",  authentication, DeveloperController.createDeveloper);

Router.put(
  "/developers/:id",
  authentication,
  authorization(["admin"]),
  DeveloperController.updateDeveloper
);

Router.delete(
  "/developers/:id",
  authentication,
  authorization(["admin"]),
  DeveloperController.deleteDeveloper
);

export { Router as developerRouter };