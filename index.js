import { convertAssToSrtFromUrl } from "./getSubtitle.js";
async function convertAssToSrtFromUrltoJimaku(url, jimakuId, jimakuApiKey) {
	const srtSubtitle = await convertAssToSrtFromUrl(url);
	const parsedUrl = url.split("/");
	const appendExtension = "[convertedToSrt].srt";
	const filename = decodeURIComponent(
		parsedUrl[parsedUrl.length - 1].replace(".ass", appendExtension),
	);
	console.log(filename);
	const newUrl =
		parsedUrl.slice(0, parsedUrl.length - 1).join("/") +
		"/" +
		encodeURIComponent(filename);
	const subtitleFormData = new FormData();
	subtitleFormData.append(
		"file",
		new Blob([srtSubtitle], { type: "text/srt" }),
		filename,
	);
	try {
		const responseJimaku = await fetch(
			`https://jimaku.cc/api/entries/${jimakuId}/upload`,
			{
				method: "POST",
				headers: {
					Authorization: jimakuApiKey,
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
		return newUrl;
	} catch (error) {
		console.error("Error uploading files:", error);
	}
}
export { convertAssToSrtFromUrltoJimaku };
