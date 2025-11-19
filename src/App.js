import './App.css'; 
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import SongButtons from './components/SongButtons.js';
import DJControls from './components/DJControls.js';
import StrudelTextVisual from './components/StrudelTextVisual.js';
import StrudelToObject from './utils/StrudelToObject.js';
import ObjectToStrudel from './utils/ObjectToStrudel.js';

let globalEditor = null;

const handleD3Data = (event) => {
    let d3Data = getD3Data();
    //console.log(d3Data);
    // console.log(event.detail);
    //console.log(`d3Data has ${d3Data.length} elements`)
};

export default function StrudelDemo() {

    const hasRun = useRef(false);

    const playSong = (() => {

        if (songText == null)
        {
            alert("You can't play a song with no text");
            return;
        }

        // Run processing using controls such as muting
        //let songObj = StrudelToObject({ inputText: songText });
        console.log(songObj);

        //let songStrudel = ObjectToStrudel({ songObj: songObj });

        //globalEditor.setCode(songStrudel);
        setIsPlaying(true);
        globalEditor.evaluate();
    })

    const stopSong = (() => {
        globalEditor.stop();
        setIsPlaying(false);
    })
  
    const adjustSong = (name, layerData, mod, value) => {

        let newSongObj = songObj;

        // Run through all instruments
        let changedInstrument;
        for (const instrument of newSongObj["instruments"])
        {
            // If instrument matches the target
            if (instrument["instrumentName"] == name)
            {
                changedInstrument = instrument;
            }
        }

        // If no matching instrument found
        if (changedInstrument == null)
        {
            alert("Attempted to edit instrument that doesn't exist");
            return;
        }

        let modSet;
        // If the instrument uses stack 
        if (changedInstrument["type"] == "stack") {
            // if modification is for one of the layers
            if (layerData != "") {
                // Search for the layer that will be modified
                for (const layer of changedInstrument["typeLayers"]) {
                    if (layer["layerData"] == layerData) {
                        modSet = layer["modifiers"];
                    }
                }
            }
            // The modification is for the stack itself
            else {
                modSet = changedInstrument["modifiers"];
            }
        }
        else {
            modSet = changedInstrument["typeLayers"]["modifiers"];
        }
        // The modification option doesn't exist
        if (modSet[mod] == null)
        {
            alert("Attempted to make a modification that doesn't exist");
            return;
        }

        // Make the modification
        modSet[mod] = value;

        setSongObj(newSongObj);
    }

    const [songObj, setSongObj] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songText, setSongText] = useState(stranger_tune);

    useEffect(() => {
        if (isPlaying) playSong();
    }, [songObj, isPlaying]);

    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });



            //document.getElementById('proc').value = ObjectToStrudel(songObj);
        }
    }, []);


return (
    <div>
        <h2 className="p-3" style={{textAlign: "center"}}>Strudel Editor</h2>
        <main>

            <div className="container-fluid">
                <div className="row p-4 pb-5" style={{ backgroundColor: "lightblue" }}>
                    <div className="justify-items-center">
                        <StrudelTextVisual defaultText={""} onChange={(e) => setSongText(e.target.value)} />
                    </div>
                </div>

                <div className="row p-4" style={{ backgroundColor: "white" }}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <SongButtons onPlay={playSong} onStop={stopSong} isPlaying={isPlaying} />
                    </div>
                </div>

                <div className="row p-4 p-5" style={{ backgroundColor: 'darkgray' }}>
                    <DJControls
                        songText={songText}
                        onAdjust={adjustSong}
                    />
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}