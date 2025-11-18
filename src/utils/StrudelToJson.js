export default function StrudelToJson({inputText, volume})
{
    // Set gain of all instruments
    // To be removed after function completed
    //inputText = inputText.replaceAll("{VOLUME}", volume);

    // Matches with instruments
    // Look for [instrument name]:, and then any number of white spaces
    // and grab all lines afterwards. The match ends when finding another instrument name or string ends
    let instrumentRegex = /^([a-zA-Z_][a-zA-Z0-9_]*):\s*([\s\S]*?)(?=^[a-zA-Z_][a-zA-Z0-9_]*:\s*|\Z)/gm;

    // Get a collection of all the matches/instruments
    const instrumentMatches = inputText.matchAll(instrumentRegex);

    let global = inputText;

    let instrumentObjs = [];
    instrumentMatches.forEach(instrumentData => {
        // Remove all instruments from the text, keeping only globals
        global = global.replace(instrumentData[0], "").trim();

        let instrumentObj = buildInstrument(instrumentData);
        console.log("Original instrument: " + instrumentData[0]);
        console.log(instrumentObj);

        instrumentObjs.push(instrumentObj);
    })  

    const strudelObj = {
        globals: global,
        instruments: instrumentObjs
    };

    //console.log("Globals: \n\n" + global);
    return inputText;


    // Split between global and All Instruments
    // Split All Instruments into individual instruments
    // For each instrument, split each modifier into fields
    /* Example Json structure
        {
            "globals": "setcps(140/60/4)",
            "instruments": [
            {
                "instrumentName": "bassline",
                "type": "instrument",
                "typeLayers": [
                {
                    "layerData": "note(pick(basslines, bass))",
                    "modifiers: [
                    {
                        "sound: "supersaw",
                        "room": "0.4",
                        "postgain": "pick(gain_patterns, pattern)"
                    }
                }]
            },
            {
                "instrumentName": "drums",
                "type": "stack",
                "typeLayers": [
                {
                    "layerData": "s("tech:5")",
                    "modifiers":
                    {
                        "postgain": "0.6",
                    } 
                },
                {
                    "layerData": "s("sh").struct("[x!3 ~!2 x!10 ~]")",
                    "modifiers":
                    {
                       "postgain": "0.7",
                       "lpf": "7000"
                    }
                }]
            }]
        }
    */
}

function buildInstrument(instrumentData)
{
    // Get the type data
    const name = instrumentData[1];
    const body = instrumentData[2];

    // Determines the instrument type
    const isStack = body.includes("stack(");

    if (isStack)
    {
        // Return the stack as an object
        let stackDecomp = decomposeStack(body);

        // Construct the object representation of the stack instrument
        const instrumentObj =
        {
            instrumentName: name,
            type: "stack",
            typeLayers: stackDecomp["typeLayers"],
            modifiers: stackDecomp["modifiers"]
        };

        return instrumentObj;
    }
    else
    {
        // Extract the note(....) of instrument
        // Keep the "..." as the layersContent variable
    }
}


function decomposeStack(stack)
{
    // Find where the opening bracket of the stack is
    let openerIndex = 0;
    while (openerIndex < stack.length && stack[openerIndex] != "(") {
        openerIndex++;
    }

    let closerIndex = 0;
    let depth = 0;

    // Search until we reach the closing bracket of the stack, where depth is 0
    for (let i = openerIndex; i < stack.length; i++) {
        if (stack[i] == "(") depth++;
        if (stack[i] == ")") depth--;
        if (depth == 0) {
            closerIndex = i;
            break;
        }
    }

    const stackOpener = stack.slice(0, openerIndex);
    const stackLayers = stack.slice(openerIndex+1, closerIndex-1);
    const stackMods = stack.slice(closerIndex+1);
    //console.log("Stack open: " + stackOpener);
    //console.log("Stack layers: " + stackLayers);
    //console.log("Stack mods: " + stackMods);

    let layerObjs = extractLayers(stackLayers);
    let modsObj = extractModifiers(stackMods);

    return {
        typeLayers: layerObjs,
        modifiers: modsObj
    }
}

function extractModifiers(modifierStr)
{
    // Allows having 1 set of nested parentheses or no nested parentheses
    // without cutting out the nested parantheses if in the string
    let modifierRegex = /\.(\w+)\(((?:[^()"]+|"[^"]*"|\((?:[^()"]+|"[^"]*"|\([^()]*\))*\))*)\)/gm;

    let modifiers = {};
    // Get all matches, splitting on dots
    const allMatches = modifierStr.matchAll(modifierRegex);

    // Set field of each modifier to its value
    for (const match of allMatches)
    {
        const modName = match[1];
        const modVal = match[2];

        modifiers[modName] = modVal;
    }
    return modifiers;
}

function getLayerData(layer)
{
    let depth = 0;
    let dotIndex = 0;

    // Find where the layerData ends, with a "." outside of brackets
    for (let i = 0; i < layer.length; i++) {
        if (layer[i] == "(") depth++;
        if (layer[i] == ")") depth--;
        if (depth == 0 && layer[i] == ".") {
            dotIndex = i;
            break;
        }
    }

    return layer.slice(0, dotIndex);
}

function extractLayers(layersStr)
{
    let layers = []

    let openerIndex = 0;
    let closerIndex = 0;
    let depth = 0;
    layersStr = layersStr.trim();

    // Search for each comma between layers
    for (let i = 0; i < layersStr.length; i++) {
        if (layersStr[i] == "(") depth++;
        if (layersStr[i] == ")") depth--;
        // Comma between layers instead of commas instead a layer
        if (depth == 0 && layersStr[i] == "," || i == layersStr.length-1) {
            closerIndex = i;

            let layer = layersStr.slice(openerIndex, closerIndex).trim();
            // Increase openerIndex by 1 so the comma seperator isn't included
            openerIndex = closerIndex + 1;
            layers.push(layer);
        }
    }

    let layerObjs = []
    // Create objects from each layer
    for (const layer of layers)
    {
        // This is the contents of the note or the s layer part of an instrument/stack
        const layerDataStr = getLayerData(layer);

        // The text modifications on the layer of instrument
        let modifierText = layer.replace(layerDataStr, "");

        let modObj = extractModifiers(modifierText);

        let layerObj = {
            layerData: layerDataStr,
            modifiers: modObj
        };

        layerObjs.push(layerObj);
    }

    return layerObjs;
}