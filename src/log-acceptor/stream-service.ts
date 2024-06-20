import { Writable } from "node:stream";

class StreamService extends Writable {
	private chunkCount = 0;
	_write(
		chunk: any,
		encoding: BufferEncoding,
		callback: (error?: Error | null) => void,
	) {
		console.log(this.chunkCount);
		this.chunkCount++;
		console.log(chunk.toString().length);
		console.log(encoding);
		callback();
	}
}

export const streamService = new StreamService();
