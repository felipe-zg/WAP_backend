import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Publisher } from "../entity";

export class PublisherController {
  static async getAllPublishers(req: Request, res: Response) {
    const publishers = cache.get("publishers");
    if (publishers) {
      console.log("serving from cache");
      return res.status(200).json({
        publishers,
      });
    } else {
      console.log("serving from db");
      const publishersRepository = AppDataSource.getRepository(Publisher);
      const publishers = await publishersRepository.find();
      cache.put("publishers", publishers, 10000);
      return res.status(200).json({
        publishers,
      });
    }
  }
  static async createPublisher(req: Request, res: Response) {
    const { name } = req.body;
    const publisher = new Publisher();
    publisher.name = name;
    const publishersRepository = AppDataSource.getRepository(Publisher);
    await publishersRepository.save(publisher);
    return res
      .status(200)
      .json({ message: "Publisher created successfully", publisher });
  }

  static async updatePublisher(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const publishersRepository = AppDataSource.getRepository(Publisher);
    const publisher = await publishersRepository.findOne({
      where: { id },
    });
    publisher.name = name;
    await publishersRepository.save(publisher);
    return res
      .status(200)
      .json({ message: "Publisher updated successfully", publisher });
  }

  static async deletePublisher(req: Request, res: Response) {
    const { id } = req.params;
    const publishersRepository = AppDataSource.getRepository(Publisher);
    const publisher = await publishersRepository.findOne({
      where: { id },
    });
    await publishersRepository.remove(publisher);
    return res
      .status(200)
      .json({ message: "Publisher deleted successfully", publisher });
  }
}