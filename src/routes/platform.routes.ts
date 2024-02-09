import * as express from "express";
import { PlatformController } from "../controllers";
import { authentication, authorization } from "../middlewares";

const Router = express.Router();

Router.get("/platforms", PlatformController.getAllPlatforms);

Router.post("/platforms", /* authentication,*/ PlatformController.createPlatform);

Router.put(
  "/platforms/:id",
  // authentication,
  // authorization(["admin"]),
  PlatformController.updatePlatform
);

Router.delete(
  "/platforms/:id",
  // authentication,
  // authorization(["admin"]),
  PlatformController.deletePlatform
);

export { Router as platformRouter };