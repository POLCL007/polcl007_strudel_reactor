export default function ObjectToStrudel(songObj)
{
    // Store globals
    console.log(songObj);

    let strudel = songObj["globals"];

    // For each instrument
    for (const instrumentObj of songObj["instruments"])
    {
        let instrument = constructInstrument(instrumentObj);
        strudel += `\n${instrument}\n`;
    }

    return strudel;
}

function constructInstrument(instrumentObj)
{
    let instrument = `${instrumentObj["instrumentName"]}: \n`;

    // There is only 1 layer
    if (instrumentObj["type"] == "instrument") {

        // Construct string of layerData
        const layer = instrumentObj["typeLayers"];
        instrument += layer["layerData"];

        // Construct layer modifiers
        const modifiers = layer["modifiers"];
        instrument += constructModifiers(modifiers);
    }
    else
    {
        instrument += "stack(";
        // Construct for each stack
        for (const layer of instrumentObj["typeLayers"])
        {
            // Add layerData
            let layerData = layer["layerData"]
            instrument += `\n${layerData}`;

            // Add layer modifiers
            const modifiers = layer["modifiers"];
            instrument += constructModifiers(modifiers);
            instrument += ",";

        }

        instrument += "\n)";

        // Add stack modifiers
        const modifiers = instrumentObj["modifiers"];
        instrument += constructModifiers(modifiers);
    }

    return instrument;
}

function constructModifiers(mods)
{
    let modsStr = "";
    for (const layerMod in mods) {
        modsStr += `\n.${layerMod}(${mods[layerMod]})`;
    }

    return modsStr;
}