import express, { Router } from "express";
import { verifyJWT } from "../middleware/auth";
import { getSuggestions } from "../controllers/suggestion.controller";

const router: Router = express.Router();

router.route("/get-suggestions").get(verifyJWT, getSuggestions);


export default router;