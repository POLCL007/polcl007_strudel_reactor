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

export function ApplyInstrumentMutes({ songText, mutedInstruments })
{
    
}

export function getMutedInstruments({ songText })
{
    const instruments = extractInstruments(songText);
    let muted = [];

    // Run through all instruments in text
    for (const instrument of instruments)
    {
        // If the instrument name starts with _, it's muted in strudel
        if (instrument["fullContent"].startsWith("_"))
        {
            muted.push(instrument["name"]);
        }
    }

    return muted;

}