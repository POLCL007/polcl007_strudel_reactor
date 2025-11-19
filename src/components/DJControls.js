import InstrumentControls from './InstrumentControls.js';
import extractInstruments from '../utils/extractInstruments.js';
import { useEffect, useState } from "react";

function DJControls({ songText, onMuteToggle }) {


    useEffect(() => {
        console.log(songText);
        const instruments = extractInstruments(songText);
        console.log(instruments);
    }, [songText]);

    return (
        <>
            <div className="row mb-4 p-3">
                <div className="col-4">
                    <div className="input-group mt-3">
                        <span className="input-group-text">Set CPM</span>
                        <input type="text" className="form-control" placeholder="60" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="col-3">
                        <span className="input-group-text">Volume</span>
                    </div>
                    <div className="col-12">
                        <input type="range" id="volume" className="form-range" min="0" max="1"
                            step="0.01" defaultValue="0.5"></input>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DJControls;