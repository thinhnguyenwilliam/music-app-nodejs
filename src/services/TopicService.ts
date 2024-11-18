import { Topic } from "../models/Topic";
import { ITopic } from "../interfaces/ITopic";

export class TopicService 
{
    static async getTopics(): Promise<ITopic[]> 
    {
        return await Topic.find({ deleted: false });
    }

    static async createTopic(data: Partial<ITopic>): Promise<ITopic> {
        const topic = new Topic(data);
        return await topic.save();
    }



    static async getTopicById(id: string): Promise<ITopic | null> {
        return await Topic.findById(id);
    }

    static async updateTopic(id: string, data: Partial<ITopic>): Promise<ITopic | null> {
        return await Topic.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteTopic(id: string): Promise<ITopic | null> {
        return await Topic.findByIdAndUpdate(id, { deleted: true, deletedAt: new Date() }, { new: true });
    }
}
