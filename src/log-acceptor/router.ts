import { Router } from "express";
import { streamService } from "./stream-service";
import { transformLogsStream } from "./transform-stream";

export const logsRouter = Router();
// logsRouter.post("/", (req, res) => {
// 	streamService.write(JSON.stringify(req.body));
// 	if (req.body.action === "unblock") {
// 		streamService.uncork();
// 	}
// 	res.status(200).send({});
// });

logsRouter.post("/transform", (req, res) => {
	transformLogsStream.write(JSON.stringify(req.body));
	res.status(200).send({});
});
