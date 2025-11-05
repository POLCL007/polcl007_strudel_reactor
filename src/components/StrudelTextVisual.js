import { useEffect, useState } from "react";
import TextVisualOptions from './TextVisualOptions.js';

function StrudelTextVisual({ defaultText, onChange })
{
    const [songVisual, setSongVisual] = useState("input")

    const showInput = ((e) => setSongVisual("input"));
    const showRepl = ((e) => setSongVisual("repl"));
    const hideAll = ((e) => setSongVisual("hideAll"));

    // Only display the text input
    if (songVisual == "input") {
        return (
            <>
                <TextVisualOptions showInput={showInput} showRepl={showRepl} hideAll={hideAll} />
                <textarea className="form-control" defaultValue={defaultText} onChange={onChange} rows="15" id="proc" ></textarea>
                <div id="editor" hidden />
                <div id="output" hidden />
            </>
        )
    }

    // Only display the Strudel REPL
    else if (songVisual == "repl") {
        return (
            <>
                <TextVisualOptions showInput={showInput} showRepl={showRepl} hideAll={hideAll} />
                <textarea className="form-control" defaultValue={defaultText} onChange={onChange} hidden rows="15" id="proc" ></textarea>
                <div id="editor"/>
                <div id="output" />
            </>
        )
    }

    // Hide both the input & Strudel REPL
    else if (songVisual == "hideAll")
    {
        return (
            <>
                <TextVisualOptions showInput={showInput} showRepl={showRepl} hideAll={hideAll} />
                <textarea className="form-control" defaultValue={defaultText} onChange={onChange} hidden rows="15" id="proc" ></textarea>
                <div id="editor" hidden/>
                <div id="output" hidden />
            </>
        )
    }
}
export default StrudelTextVisual;