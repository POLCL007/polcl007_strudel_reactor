import extractInstruments from './extractInstruments.js';

export default function PreProcess({ unprocessedText, volume })
{
    // Add entire volume modification
    let processedText = "all(x => x.gain({VOLUME})";

    // Set the volume for all instruments
    processedText = processedText.replaceAll("{VOLUME}", volume);

    // Get all instruments in the text
    const instruments = extractInstruments(unprocessedText);

    return processedText;
}