import express from "express";
import { TopicController } from "../controllers/TopicController";

const router = express.Router();

router.post("/", TopicController.create);
router.get("/", TopicController.getAll);
router.get("/:id", TopicController.getOne);
router.put("/:id", TopicController.update);
router.delete("/:id", TopicController.delete);

export default router;
