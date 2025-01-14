import path from "node:path";
import fsp from "node:fs/promises";
import asstosrt from "ass-to-srt";
const DIRNAME = import.meta.dirname;
const FILEPATH = path.join(
	DIRNAME,
	"/subtitles/[KitaujiSub&STYHSub&H-BBR] Oshi no Ko [01][WebRip][JPN].ass",
);
console.log({ DIRNAME, FILEPATH });
let assSubtitle;
try {
	assSubtitle = await fsp.readFile(FILEPATH, { encoding: "utf8" });
	console.log(assSubtitle);
} catch (err) {
	console.log(err);
}
const srtSubtitle = asstosrt(assSubtitle);
console.log(srtSubtitle);

const subtitleFormData = new FormData();
subtitleFormData.append(
	"file",
	new Blob([srtSubtitle], { type: "text/srt" }),
	"[KitaujiSub&STYHSub&H-BBR] Oshi no Ko [01][WebRip][JPN][converted].srt",
);
console.log(subtitleFormData);
try {
	const responseJimaku = await fetch(
		"https://jimaku.cc/api/entries/715/upload",
		{
			method: "POST",
			headers: {
				Authorization:
					"AAAAAAAAAA4uAS54pw78_L2DpksYB1HnJoYFd38TUsratCjUBjRIqHrRnA",
			},
			body: subtitleFormData,
		},
	);
	console.log(
		"STATUS:",
		responseJimaku.status,
		"\nCONTENT TYPE:",
		responseJimaku.headers.get("content-type"),
	);

	if (!responseJimaku.ok) {
		console.log(responseJimaku);
		throw new Error(`HTTP error! Status: ${responseJimaku.status}`);
	}

	const data = await responseJimaku.json();
	console.log("Upload successful:", data);
} catch (error) {
	console.error("Error uploading files:", error);
}
