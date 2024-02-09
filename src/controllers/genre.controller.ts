import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Genre } from "../entity";

export class GenreController {
  static async getAllGenres(req: Request, res: Response) {
    const genres = cache.get("genres");
    if (genres) {
      console.log("serving from cache");
      return res.status(200).json({
        genres,
      });
    } else {
      console.log("serving from db");
      const genreRepository = AppDataSource.getRepository(Genre);
      const genres = await genreRepository.find();
      cache.put("genres", genres, 10000);
      return res.status(200).json({
        genres,
      });
    }
  }
  static async createGenre(req: Request, res: Response) {
    const { name } = req.body;
    const genre = new Genre();
    genre.name = name;
    const genreRepository = AppDataSource.getRepository(Genre);
    await genreRepository.save(genre);
    return res
      .status(200)
      .json({ message: "Genre created successfully", genre });
  }

  static async updateGenre(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const genreRepository = AppDataSource.getRepository(Genre);
    const genre = await genreRepository.findOne({
      where: { id },
    });
    genre.name = name;
    await genreRepository.save(genre);
    return res
      .status(200)
      .json({ message: "Genre updated successfully", genre });
  }

  static async deleteGenre(req: Request, res: Response) {
    const { id } = req.params;
    const genreRepository = AppDataSource.getRepository(Genre);
    const genre = await genreRepository.findOne({
      where: { id },
    });
    await genreRepository.remove(genre);
    return res
      .status(200)
      .json({ message: "Genre deleted successfully", genre });
  }
}