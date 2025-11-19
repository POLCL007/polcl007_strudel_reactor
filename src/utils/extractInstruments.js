export default function extractInstruments(songText) {
    let instrumentRegex = /^_?([a-zA-Z_][a-zA-Z0-9_]*):\s*([\s\S]*?)(?=^[a-zA-Z_][a-zA-Z0-9_]*:\s*|\Z)/gm;

    let matches = songText.matchAll(instrumentRegex);

    let instruments = []
    for (const instrumentData of matches)
    {
        const instrument = {
            name: instrumentData[1],
            fullContent: instrumentData[0]
        }
        instruments.push(instrument);
    }
    console.log(instruments);
    return matches;
}