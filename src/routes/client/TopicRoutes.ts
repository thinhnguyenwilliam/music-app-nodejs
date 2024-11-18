import express from "express";
import { TopicController } from "../../controllers/client/TopicController";

const router = express.Router();


router.get("/", TopicController.getAll);
// router.post("/", TopicController.create);
// router.get("/:id", TopicController.getOne);
// router.put("/:id", TopicController.update);
// router.delete("/:id", TopicController.delete);

export default router;
