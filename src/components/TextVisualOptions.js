import { useEffect, useState } from "react";

function StrudelTextVisual({ showInput, showRepl, hideAll }) {

    return (
        <>
            <button onClick={showInput}>Show input</button>
            <button onClick={showRepl}>Show REPL</button>
            <button onClick={hideAll}>Hide input & REPL</button>
        </>
    )
}
export default StrudelTextVisual;