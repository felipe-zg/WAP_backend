import * as express from "express";
import { authentication, authorization } from "../middlewares";
import { GenreController } from "../controllers";

const Router = express.Router();

Router.get("/genres", GenreController.getAllGenres);

Router.post("/genres", /* authentication,*/ GenreController.createGenre);

Router.put(
  "/genres/:id",
  // authentication,
  // authorization(["admin"]),
  GenreController.updateGenre
);

Router.delete(
  "/genres/:id",
  // authentication,
  // authorization(["admin"]),
  GenreController.deleteGenre
);

export { Router as genreRouter };