import { Router } from "express";
import pipeline from "../pipeline/pipeline.js";

const router = Router();

router.route("/article-data").get(pipeline);

export default router;