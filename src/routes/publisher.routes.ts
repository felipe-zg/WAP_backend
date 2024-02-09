import * as express from "express";
import { authentication, authorization } from "../middlewares";
import { PublisherController } from "../controllers";

const Router = express.Router();

Router.get("/publishers", PublisherController.getAllPublishers);

Router.post("/publishers", /* authentication,*/ PublisherController.createPublisher);

Router.put(
  "/publishers/:id",
  // authentication,
  // authorization(["admin"]),
  PublisherController.updatePublisher
);

Router.delete(
  "/publishers/:id",
  // authentication,
  // authorization(["admin"]),
  PublisherController.deletePublisher
);

export { Router as publisherRouter };