export default function StrudelToObject(inputText)
{
    // Matches with instruments
    // Look for [instrument name]:, and then any number of white spaces
    // and grab all lines afterwards. The match ends when finding another instrument name or string ends
    let instrumentRegex = /^([a-zA-Z_][a-zA-Z0-9_]*):\s*([\s\S]*?)(?=^[a-zA-Z_][a-zA-Z0-9_]*:\s*|\Z)/gm;

    console.log(inputText);

    // Get a collection of all the matches/instruments
    const instrumentMatches = inputText.matchAll(instrumentRegex);

    let global = inputText;

    let instrumentObjs = [];
    instrumentMatches.forEach(instrumentData => {
        // Remove all instruments from the text, keeping only globals
        global = global.replace(instrumentData[0], "").trim();

        // Build an object representing the instrument
        let instrumentObj = buildInstrument(instrumentData);
        instrumentObjs.push(instrumentObj);
    })  

    const strudelObj = {
        globals: global,
        instruments: instrumentObjs
    };

    return strudelObj;
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
        // Extract the layer without the stack encapsulator as its a regular note
        let noteDecomp = extractLayers(body)[0];

        const instrumentObj =
        {
            instrumentName: name,
            type: "instrument",
            typeLayers: noteDecomp,
            modifiers: ""
        };

        return instrumentObj;
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

    const stackLayers = stack.slice(openerIndex+1, closerIndex-1);
    const stackMods = stack.slice(closerIndex+1);

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
        // Reached the first "." outside of brackets, indicating a modifier
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

    // Search for each comma between layers
    for (let i = 0; i < layersStr.length; i++) {
        if (layersStr[i] == "(") depth++;
        if (layersStr[i] == ")") depth--;
        // Comma between layers instead of commas instead a layer
        if (depth == 0 && layersStr[i] == "," || i == layersStr.length-1) {
            closerIndex = i;

            let layer = layersStr.slice(openerIndex, closerIndex);
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

        // Object representing all modifiers for the layer
        let modObj = extractModifiers(modifierText);

        let layerObj = {
            layerData: layerDataStr,
            modifiers: modObj
        };

        layerObjs.push(layerObj);
    }

    return layerObjs;
}