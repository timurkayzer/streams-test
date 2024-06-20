import express, { Router } from "express";
import * as fs from "fs";
import { ReadLineFileStream } from "./readable-stream";

export const fileDownloadRouter = Router();

fileDownloadRouter.get("/", (req: express.Request, res: express.Response) => {
	// res.download('lghub_installer.exe')
	const stream = fs.createReadStream("lghub_installer.exe");
	stream.on("data", (chunk) =>
		console.log("Chunk has been read", chunk.length),
	);
	stream.pipe(res);
});

fileDownloadRouter.get(
	"/text-file",
	(req: express.Request, res: express.Response) => {
		const readLineFileStream = new ReadLineFileStream("test-readfile.txt");
		readLineFileStream.stream.pipe(res);
	},
);
