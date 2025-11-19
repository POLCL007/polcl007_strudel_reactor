import extractInstruments from '../utils/extractInstruments.js';
import { useEffect, useState } from "react";
import { ApplyInstrumentMutes }  from "../utils/PreProcess.js";

function InstrumentControls({songText, setSongText})
{
    const [instruments, setInstruments] = useState([]);
    const [muteStates, setMuteStates] = useState({});

    useEffect(() => {
        let instrums = extractInstruments(songText);
        setInstruments(instrums);
    }, []);

    const updateMuteStates = ((instr) => {
        let newStates = {};
        console.log(muteStates);

        for (const ins of instruments)
        {
            // If there is a _ at the start, its muted
            if (ins["fullContent"].startsWith("_")) {
                newStates[ins["name"]] = true;
            }
            // If not, its playing
            else
            {
                newStates[ins["name"]] = false;
            }

            // Switch the state of instrumetn
            if (ins["name"] == instr)
            {
                console.log("Switch state for " + instr);
                let current = newStates[instr]
                console.log("It was " + current);
                newStates[instr] = !current;
                console.log("Switched it to " + newStates[instr]);
            }
        }
        console.log(muteStates);
        console.log("End");

        let newSongText = ApplyInstrumentMutes(songText, newStates);
        setMuteStates(newStates);
        setSongText(newSongText);
    });
    
    return (
        <div>

            {
                instruments.map(instrum => (
                    <div key={instrum}>
                        <p>this is for {instrum["name"]}</p>
                    <input key={instrum["name"]}
                        type="checkbox"
                        checked={muteStates[instrum["name"]]}
                        onChange={() => updateMuteStates(instrum["name"])}
                    />

                </div>
            ))}
        </div>
    );
}
export default InstrumentControls;