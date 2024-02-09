import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Game } from "../entity/Game.entity";

export class GameController {
  static async getAllGames(req: Request, res: Response) {
    const games = cache.get("games");
    if (games) {
      console.log("serving from cache");
      return res.status(200).json({
        games,
      });
    } else {
      console.log("serving from db");
      const gameRepository = AppDataSource.getRepository(Game);
      const games = await gameRepository.find();
      cache.put("games", games, 10000);
      return res.status(200).json({
        games,
      });
    }
  }
  static async createGame(req: Request, res: Response) {
    const { title, description, price, rating, image, platform, genre, publisher, releaseDate, developer } =
      req.body;
    const game = new Game();
    game.title = title;
    game.description = description;
    game.price = price;
    game.platform = platform;
    game.rating = rating;
    game.image = image;
    game.genre = genre;
    game.publisher = publisher;
    game.releaseDate = releaseDate;
    game.developer = developer;
    const gameRepository = AppDataSource.getRepository(Game);
    await gameRepository.save(game);
    return res
      .status(200)
      .json({ message: "Game created successfully", game });
  }

  static async updateGame(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, price, rating, image, platform, genre, publisher, releaseDate, developer } =
      req.body;
    const gameRepository = AppDataSource.getRepository(Game);
    const game = await gameRepository.findOne({
      where: { id },
    });
    game.title = title;
    game.description = description;
    game.price = price;
    game.platform = platform;
    game.rating = rating;
    game.image = image;
    game.genre = genre;
    game.publisher = publisher;
    game.releaseDate = releaseDate;
    game.developer = developer;
    await gameRepository.save(game);
    return res
      .status(200)
      .json({ message: "Game updated successfully", game });
  }

  static async deleteGame(req: Request, res: Response) {
    const { id } = req.params;
    const gameRepository = AppDataSource.getRepository(Game);
    const game = await gameRepository.findOne({
      where: { id },
    });
    await gameRepository.remove(game);
    return res
      .status(200)
      .json({ message: "Game deleted successfully", game });
  }
}