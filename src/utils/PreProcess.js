import extractInstruments from './extractInstruments.js';

export default function PreProcess({ songText, volume })
{
    // Set the volume for all instruments
    let processedText = songText.replaceAll("{VOLUME}", volume);

    return processedText;
}

export function ApplyInstrumentMutes({ songText, mutedInstruments })
{
    for (const instrumentName of mutedInstruments)
    {
        if (mutedInstruments.includes(instrumentName)) {
            songText.replaceAll(`${instrumentName}`, `_${instrumentName}`);
        }
        else
        {
            songText.replaceAll(`_${instrumentName}`, `${instrumentName}`);
        }
    }
}