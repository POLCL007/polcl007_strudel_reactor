import { useEffect, useState } from "react";
import TextVisualOptions from './TextVisualOptions.js';

function StrudelTextVisual({ defaultText, onChange })
{
    const [songVisual, setSongVisual] = useState("input")

    const [hideInput, setHideInput] = useState(false);
    const [hideRepl, setHideRepl] = useState(false);

    const showInput = ((e) => setSongVisual("input"));
    const showRepl = ((e) => setSongVisual("repl"));
    const hideAll = ((e) => setSongVisual("hideAll"));

    useEffect(() => {
        // Set the visibility of input and repl based on selected visual
        if (songVisual != "input") setHideInput(true);
        else setHideInput(false);

        if (songVisual != "repl") setHideRepl(true);
        else setHideRepl(false);

    }, [songVisual])

    // Only display the selected to be visible visuals
    return (
        <>
            <TextVisualOptions showInput={showInput} showRepl={showRepl} hideAll={hideAll} />
            <textarea className="form-control" defaultValue={defaultText}
                onChange={onChange} rows="15" id="proc" hidden={hideInput} ></textarea>
            <div id="editor" hidden={hideRepl} />
            <div id="output" hidden={hideRepl} />
        </>
    )
}
export default StrudelTextVisual;