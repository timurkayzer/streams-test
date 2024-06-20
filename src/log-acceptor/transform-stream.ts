import { Transform, TransformCallback } from "node:stream";
import fs from "fs";

// print and put incoming data into file
export class TransformLogsStream extends Transform {
	private fileStream: fs.WriteStream;
	constructor(outputFilePath: string) {
		super();
		this.fileStream = fs.createWriteStream(outputFilePath);
	}
	_transform(
		chunk: any,
		encoding: BufferEncoding,
		callback: TransformCallback,
	) {}
}

export const transformLogsStream = new TransformLogsStream(
	"test-files/test-output.txt",
);
