import { Router } from "express";
import { streamService } from "./stream-service";

export const logsRouter = Router();
logsRouter.post("/", (req, res) => {
	streamService.write(JSON.stringify(req.body));
	res.status(200).send({});
});