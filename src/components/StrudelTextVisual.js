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
                <label htmlFor="exampleFormControlTextarea1" className="form-label" hidden>Text to preprocess:</label>
                <textarea className="form-control" defaultValue={defaultText} onChange={onChange} rows="15" id="proc" ></textarea>
            </>
        )
    }

    // Only display the Strudel REPL
    if (songVisual == "repl") {
        return (
            <>
                <TextVisualOptions showInput={showInput} showRepl={showRepl} hideAll={hideAll} />
                <label htmlFor="exampleFormControlTextarea1" className="form-label" hidden>Text to preprocess:</label>
                <textarea className="form-control" defaultValue={defaultText} onChange={onChange} hidden rows="15" id="proc" ></textarea>
            </>
        )
    }
    if (songVisual == "hideAll")
    {
        return (
            <TextVisualOptions showInput={showInput} showRepl={showRepl} hideAll={hideAll} />
        )
    }
}
export default StrudelTextVisual;