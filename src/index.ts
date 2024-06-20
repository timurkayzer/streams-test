import express from "express";
import { fileDownloadRouter } from "./file-upload/router";
import { logsRouter } from "./log-acceptor/router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/file", fileDownloadRouter);
app.use("/logs", logsRouter);
app.listen(3000, () => console.log("Server is running on port 3000"));
app.use((err: Error, req: express.Request) => {
	console.error(err);
	return { msg: "Request failed." };
});

process.on("uncaughtException", (err) => console.log(err));
process.on("unhandledRejection", (err) => console.log(err));
