import { useEffect, useState } from "react";
import TextVisualOptions from './TextVisualOptions.js';

function StrudelTextVisual({ defaultText })
{
    const [hideInput, setHideInput] = useState(false);

    // Only display the selected to be visible visuals
    return (
        <>
            <button className="btn btn-secondary" style={{ border: "1px solid black" }} onClick={showInput}>Tooggle</button>
            <TextVisualOptions showInput={showInput} showRepl={showRepl} hideAll={hideAll} />
            <textarea className="form-control" defaultValue={defaultText}
                rows="15" id="proc" hidden={hideInput} ></textarea>
            <div id="editor" hidden={hideRepl} />
            
        </>
    )
}
export default StrudelTextVisual;