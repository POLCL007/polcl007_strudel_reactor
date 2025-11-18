export default function ObjectToStrudel({ songObj })
{
    // Store globals
    let strudel = songObj["globals"];

    // For each instrument
    for (const instrumentObj of songObj["instruments"])
    {
        let instrument = constructInstrument(instrumentObj);
        strudel += `${instrument}\n`;
    }

    console.log(strudel);
}

function constructInstrument(instrumentObj)
{
    return "";
}

function constructModifier(modifiersObj)
{
    return "";
}