import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Platform } from "../entity";

export class PlatformController {
  static async getAllPlatforms(req: Request, res: Response) {
    const platforms = cache.get("platforms");
    if (platforms) {
      console.log("serving from cache");
      return res.status(200).json({
        platforms,
      });
    } else {
      console.log("serving from db");
      const platformRepository = AppDataSource.getRepository(Platform);
      const platforms = await platformRepository.find();
      cache.put("platforms", platforms, 10000);
      return res.status(200).json({
        platforms,
      });
    }
  }
  static async createPlatform(req: Request, res: Response) {
    const { name } = req.body;
    const platform = new Platform();
    platform.name = name;
    const platformRepository = AppDataSource.getRepository(Platform);
    await platformRepository.save(platform);
    return res
      .status(200)
      .json({ message: "Platform created successfully", platform });
  }

  static async updatePlatform(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const platformRepository = AppDataSource.getRepository(Platform);
    const platform = await platformRepository.findOne({
      where: { id },
    });
    platform.name = name;
    await platformRepository.save(platform);
    return res
      .status(200)
      .json({ message: "Platform updated successfully", platform });
  }

  static async deletePlatform(req: Request, res: Response) {
    const { id } = req.params;
    const platformRepository = AppDataSource.getRepository(Platform);
    const platform = await platformRepository.findOne({
      where: { id },
    });
    await platformRepository.remove(platform);
    return res
      .status(200)
      .json({ message: "Platform deleted successfully", platform });
  }
}