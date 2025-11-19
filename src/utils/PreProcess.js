import extractInstruments from './extractInstruments.js';

export default function PreProcess({ songText, volume })
{
    // Set the volume for all instruments
    let processedText = songText.replaceAll("{VOLUME}", volume);

    return processedText;
}

export function ApplyInstrumentMutes( songText, instrumentStates)
{
    console.log(instrumentStates);

    for (const nameKey in instrumentStates)
    {
        let state = instrumentStates[nameKey];
        if (state == true) {
            songText = songText.replaceAll(`${nameKey}`, `_${nameKey}`);
            console.log(`Make sure that ${nameKey} off`)
        }
        else
        {
            songText = songText.replaceAll(`_${nameKey}`, `${nameKey}`);
        }
    }

    return songText;
}