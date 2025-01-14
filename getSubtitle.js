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
const output = await convertAssToSrtFromUrl(
	"https://jimaku.cc/entry/715/download/%5BKitaujiSub&STYHSub&H-BBR%5D%20Oshi%20no%20Ko%20%5B01%5D%5BWebRip%5D%5BJPN%5D.ass",
);
console.log(output);
export { convertAssToSrtFromUrl };
