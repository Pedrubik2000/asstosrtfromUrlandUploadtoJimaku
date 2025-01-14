import asstosrt from "ass-to-srt";
async function convertAssToSrtFromUrl(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const readable = response.body;

		let arrayString = "";
		for await (const chunk of readable)
			arrayString += Buffer.from(chunk).toString();
		const output = asstosrt(arrayString);
		return output;
	} catch (error) {
		console.error(error.message);
	}
}
export { convertAssToSrtFromUrl };
