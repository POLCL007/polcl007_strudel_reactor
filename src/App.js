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
import StrudelToJson from './utils/StrudelToJson.js';
import PostProcessResult from './utils/PostProcessResult';

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

        // Run processing using controls such as muting
        let postProcessText = StrudelToJson({ inputText: songText, volume: volume });

        // Check processed text is usable
        let postProcessResult = PostProcessResult(postProcessText);
        if (postProcessResult != "Success")
        {
            alert(postProcessResult);
            return;
        }

        // Put changes controls make to effect
        globalEditor.setCode(postProcessText);

        setIsPlaying(true);
        globalEditor.evaluate();
    })

    const stopSong = (() => {
        globalEditor.stop();
        setIsPlaying(false);
    })

    const [songText, setSongText] = useState(stranger_tune)
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    useEffect(() => {
        if (isPlaying) playSong();
    }, [volume])

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
            
        document.getElementById('proc').value = stranger_tune
    }
}, [songText]);


return (
    <div>
        <h2 className="p-3" style={{textAlign: "center"}}>Strudel Editor</h2>
        <main>

            <div className="container-fluid">
                <div className="row p-4 pb-5" style={{ backgroundColor: "lightblue" }}>
                    <div className="justify-items-center">
                        <StrudelTextVisual defaultText={songText} onChange={(e) => setSongText(e.target.value)} />
                    </div>
                </div>

                <div className="row p-4" style={{ backgroundColor: "white" }}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <SongButtons onPlay={playSong} onStop={stopSong} isPlaying={isPlaying} />
                    </div>
                </div>

                <div className="row p-4 p-5" style={{backgroundColor: 'darkgray'}}>
                    <DJControls volume={volume} onVolumeChange={(e) => setVolume(e.target.value)} />
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}