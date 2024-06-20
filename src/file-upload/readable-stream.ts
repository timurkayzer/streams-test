import { Readable } from "node:stream";
import * as fs from "node:fs";

export class ReadLineFileStream {
	stream: Readable;
	constructor(filePath: string) {
		this.stream = Readable.from(fs.createReadStream(filePath));
		this.stream.on("data", (chunk) => {
			console.log("///////////");
			console.log(chunk.toString());
		});
	}
}
