import { useEffect, useState } from "react";
import StrudelToObject from '../utils/StrudelToObject.js';

function Options({ inputHidden, toggleInput, songText, setSongText, loadSave }) {

    const [toggleBtnSettings, setToggleBtnSettings] = useState({});

    // This use effect changes every time the toggle btn is clicked, because inputHidden changes in App.js
    useEffect(() => {
        let toggleSettings = {
            bgColour: 'gray',
            text: 'Erorr setting up toggle button'
        };

        if (inputHidden) {
            toggleSettings["bgColour"] = "blue";
            toggleSettings["text"] = "Toggle input visible";
        }
        else {
            toggleSettings["bgColour"] = "green";
            toggleSettings["text"] = "Toggle input hidden";
        }

        setToggleBtnSettings(toggleSettings);
    }, [inputHidden]);


    const saveJson = (() => {
        // As part of the conversion process, invalid text is removed, keeping only whats valid
        // It also rejects invalid text
        let songObj = StrudelToObject(songText);
        let jsonVersion = JSON.stringify(songObj);

        localStorage.setItem("songSave", jsonVersion);
        alert("Saved strudel song");
    });

    return (
            <>
            <button className="btn btn-secondary mb-3"
                    style={{border: "1px solid black", backgroundColor: `${toggleBtnSettings.bgColour}`}}
                    onClick={toggleInput}>{toggleBtnSettings.text}</button>
            <button className="btn btn-warning mb-2" onClick={saveJson}>Save</button>
            <button className="btn btn-warning" onClick={loadSave}>Load</button>
            </>
    )
}
export default Options;