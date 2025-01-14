import fsp from "node:fs/promises";
import { convertAssToSrtFromUrl } from "./getSubtitle.js";
const url =
	"https://jimaku.cc/entry/715/download/%5BKitaujiSub&STYHSub&H-BBR%5D%20Oshi%20no%20Ko%20%5B02%5D%5BWebRip%5D%5BJPN%5D.ass";
const srtSubtitle = await convertAssToSrtFromUrl(url);
const parsedUrl = url.split("/");
const appendExtension = "[convertedToSrt].srt";
const filename = decodeURIComponent(
	parsedUrl[parsedUrl.length - 1].replace(".ass", appendExtension),
);
console.log(filename);

const subtitleFormData = new FormData();
subtitleFormData.append(
	"file",
	new Blob([srtSubtitle], { type: "text/srt" }),
	filename,
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
