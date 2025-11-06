import { useEffect, useState } from "react";

function StrudelTextVisual({ showInput, showRepl, hideAll }) {

    return (
        <>
            <button className="btn btn-secondary" style={{border: "1px solid black"}} onClick={showInput}>Show input</button>
            <button className="btn btn-secondary" style={{ border: "1px solid black"}} onClick={showRepl}>Show REPL</button>
            <button className="btn btn-secondary" style={{ border: "1px solid black" }} onClick={hideAll}>Hide input & REPL</button>
        </>
    )
}
export default StrudelTextVisual;