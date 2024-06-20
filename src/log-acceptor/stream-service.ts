import { Writable } from "node:stream";

class StreamService extends Writable {
	private chunkCount = 0;
	_write(
		chunk: any,
		encoding: BufferEncoding,
		callback: (error?: Error | null) => void,
	) {
		const data = JSON.parse(chunk.toString());
		console.log(data);
		if (data.action === "block") {
			this.cork();
		}
		console.log(this.chunkCount);
		this.chunkCount++;
		callback();
	}
}

export const streamService = new StreamService({
	highWaterMark: 512 * 1024 * 1024,
});
