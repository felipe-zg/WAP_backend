import * as express from "express";
import { authentication } from "../middlewares/authentication";
import { authorization } from "../middlewares/authorization";
import { GameController } from "../controllers/game.controller";

const Router = express.Router();

Router.get("/games", authentication, GameController.getAllGames);
Router.post("/games", authentication, GameController.createGame);

Router.put(
  "/games/:id",
  authentication,
  authorization(["admin"]),
  GameController.updateGame
);
Router.delete(
  "/games/:id",
  authentication,
  authorization(["admin"]),
  GameController.deleteGame
);
export { Router as gameRouter };