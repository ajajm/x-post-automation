import { Router } from "express";
import fetchArticleData from "../controller/dev.controller.js";

const router = Router();

router.route("/article-data").get(fetchArticleData);

export default router;