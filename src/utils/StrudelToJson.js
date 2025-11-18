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
        if (instrumentData[0].includes("stack"))
        {
            console.log(`Full instrument content: ${instrumentData[0]}`);
        }
        
        //console.log(`Name: ${instrumentData[1]}`)
        //console.log(`Body content: ${instrumentData[2]}`)

        // Remove all instruments from the text, keeping only globals
        global = global.replace(instrumentData[0], "").trim();

        let instrument = buildInstrument(instrumentData);
        instrumentObjs.push(instrument);
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

    let layersContent = "";
    if (isStack)
    {
        let decompose = decomposeInstrument(body);

        console.log("Pre layers: " + decompose[0]);
        console.log("Layers: " + decompose[1]);
        console.log("Post layers: " + decompose[2]);

        //let stackNonLayers = body.replace(layersContent, "");
        //console.log(stackNonLayers);
        //console.log(layersContent);
    }
    else
    {
        // Extract the note(....) of instrument
        // Keep the "..." as the layersContent variable
    }

    // Turn the layers into individual objects with "layerData" and modifiers
    let layerObjs = [];

    let instrumentType = "instrument";
    if (isStack) instrumentType = "stack";

    

    const instrumentObj =
    {
        instrumentName: instrumentData[1],
        type: instrumentType,
        typeLayers: layerObjs
    };
    return instrumentObj;
}

// Returns an array of the input string, containing instrument type and its layers
function decomposeInstrument(body)
{
    // Find where the opening bracket of the stack is
    let openerIndex = 0;
    while (openerIndex < body.length && body[openerIndex] != "(") {
        openerIndex++;
    }

    let closerIndex = 0;
    let depth = 0;

    // Search until we reach the closing bracket of the stack, where depth is 0
    for (let i = openerIndex; i < body.length; i++) {
        if (body[i] == "(") depth++;
        if (body[i] == ")") depth--;
        if (depth == 0) {
            closerIndex = i;
            break;
        }
    }

    // Don't include stack's open and close brackets in the layers
    openerIndex++;
    closerIndex--;

    let splitArray = [];
    // Section before the layers
    splitArray.push(body.slice(0, openerIndex-1));

    // Section containing layers
    // Process the layers
    const layers = body.slice(openerIndex, closerIndex);
    splitArray.push(body.slice(openerIndex, closerIndex));
    extractLayers(layers);

    // Section containing modifiers of instrument unrelated to layers
    let postMods = body.slice(closerIndex, -1);
    postMods = extractModifiers(postMods);
    splitArray.push(postMods);
  
    return splitArray;
}

function extractModifiers(modifierStr)
{
    let modifierRegex = /\.(\w+)\(([^)]*)/gm;

    let modifiers = {};
    const allMatches = modifierStr.matchAll(modifierRegex);

    // Set field of each modifier to its value
    for (const match of allMatches) {

        modifiers[match[1]] = match[2];
    }

    console.log("- modifiers obj below -");
    console.log(modifiers);

    return modifiers;
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
        if (depth == 0 && layersStr[i] == ",") {
            closerIndex = i;

            let layer = layersStr.slice(openerIndex, closerIndex).trim();
            // Increase openerIndex by 1 so the comma seperator isn't included
            openerIndex = closerIndex + 1;
            layers.push(layer);
            console.log(layer);
        }
    }

    // Create objects from each layer
    console.log(layers);
}