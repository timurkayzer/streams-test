import { Transform, TransformCallback } from "node:stream";
import fs from "fs";
import { streamService } from "./stream-service";

// print and put incoming data into file
export class TransformLogsStream extends Transform {
	private fileStream: fs.WriteStream;
	private state: "success" | "fail" = "success";
	constructor(outputFilePath: string) {
		super();
		this.pipe(streamService);
		this.fileStream = fs.createWriteStream(outputFilePath);
	}
	_transform(
		chunk: any,
		encoding: BufferEncoding,
		callback: TransformCallback,
	) {
		console.log(chunk.toString());
		try {
			const fail = Math.random() * 100 < 10;
			const resultData = JSON.parse(chunk.toString());
			if (!fail && this.state === "success") {
				console.log("success");
				resultData.state = "success";
			} else {
				resultData.state = "fail";
				if (this.state === "success") {
					this.state = "fail";
					console.log("fail");
					this.cork();
					this.unpipe(streamService);
					this.pipe(this.fileStream);
					this.uncork();
				} else {
					console.log("still fail");
				}
			}
			this.push(JSON.stringify(resultData));
			callback();
			return true;
		} catch (e) {
			console.error(e);
			callback(e as Error);
		}
	}
}

export const transformLogsStream = new TransformLogsStream(
	"test-files/test-output.txt",
);
