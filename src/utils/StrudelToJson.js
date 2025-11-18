export default function StrudelToJson({inputText, volume})
{
    // Set gain of all instruments
    // To be removed after function completed
    inputText = inputText.replaceAll("{VOLUME}", volume);

    // Matches with instruments
    // Look for [instrument name]:, and then any number of white spaces
    // and grab all lines afterwards. The match ends when finding another instrument name or string ends
    let instrumentRegex = /^([a-zA-Z_][a-zA-Z0-9_]*):\s*([\s\S]*?)(?=^[a-zA-Z_][a-zA-Z0-9_]*:\s*|\Z)/gm;

    // Get a collection of all the matches/instruments
    const instrumentMatches = inputText.matchAll(instrumentRegex);

    let global = inputText;

    let instrumentObjs = [];

    instrumentMatches.forEach(instrumentData => {
        //console.log(`Full instrument content: ${instrumentData[0]}`)
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
        // Get all the layers as 1 string
        layersContent = extractStackContent(body);
    }
    else
    {
        // Extract the note(....) of instrument
        // Keep the "..." as the layersContent variable
    }

    let instrumentType = "instrument";
    if (isStack) instrumentType = "stack";

    // Turn the layers into individual objects with "layerData" and modifiers
    let layerObjs = []

    const instrumentObj =
    {
        instrumentName: instrumentData[1],
        type: instrumentType,
        typeLayers: layerObjs
    }
    return instrumentObj;
}

function buildInstrumentlayers() { }

function extractStackContent(body)
{
    return "";
}