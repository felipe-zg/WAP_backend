import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Developer } from "../entity";

export class DeveloperController {
  static async getAllDevelopers(req: Request, res: Response) {
    const developers = cache.get("developers");
    if (developers) {
      console.log("serving from cache");
      return res.status(200).json({
        developers,
      });
    } else {
      console.log("serving from db");
      const developerRepository = AppDataSource.getRepository(Developer);
      const developers = await developerRepository.find();
      cache.put("developers", developers, 10000);
      return res.status(200).json({
        developers,
      });
    }
  }
  static async createDeveloper(req: Request, res: Response) {
    const { name } = req.body;
    const developer = new Developer();
    developer.name = name;
    const developerRepository = AppDataSource.getRepository(Developer);
    await developerRepository.save(developer);
    return res
      .status(200)
      .json({ message: "Developer created successfully", developer });
  }

  static async updateDeveloper(req: Request, res: Response) {
    console.log('api update');
    const { id } = req.params;
    const { name } = req.body;
    console.log('api update id', id);
    console.log('api update name', name);
    const developerRepository = AppDataSource.getRepository(Developer);
    const developer = await developerRepository.findOne({
      where: { id },
    });
    developer.name = name;
    await developerRepository.save(developer);
    return res
      .status(200)
      .json({ message: "Developer updated successfully", developer });
  }

  static async deleteDeveloper(req: Request, res: Response) {
    const { id } = req.params;
    const developerRepository = AppDataSource.getRepository(Developer);
    const developer = await developerRepository.findOne({
      where: { id },
    });
    await developerRepository.remove(developer);
    return res
      .status(200)
      .json({ message: "Developer deleted successfully", developer });
  }
}