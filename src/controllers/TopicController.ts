import { Request, Response } from "express";
import { TopicService } from "../services/TopicService";

export class TopicController 
{
    static async getAll(req: Request, res: Response): Promise<void> 
    {
        const topics = await TopicService.getTopics();
        res.status(200).json(topics);
    }

    static async create(req: Request, res: Response): Promise<void> {

        const topic = await TopicService.createTopic(req.body);
        res.status(201).json(topic);

    }



    static async getOne(req: Request, res: Response): Promise<void> {

        const topic = await TopicService.getTopicById(req.params.id);
        if (!topic) {
            res.status(404).json({ message: "Topic not found" });
            return;
        }
        res.status(200).json(topic);

    }

    static async update(req: Request, res: Response): Promise<void> {

        const topic = await TopicService.updateTopic(req.params.id, req.body);
        if (!topic) {
            res.status(404).json({ message: "Topic not found" });
            return;
        }
        res.status(200).json(topic);

    }

    static async delete(req: Request, res: Response): Promise<void> {

        const topic = await TopicService.deleteTopic(req.params.id);
        if (!topic) {
            res.status(404).json({ message: "Topic not found" });
            return;
        }
        res.status(200).json(topic);

    }
}
