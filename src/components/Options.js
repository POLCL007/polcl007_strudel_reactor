import { useEffect, useState } from "react";

function Options({ inputHidden, toggleInput }) {

    const [toggleBtnSettings, setToggleBtnSettings] = useState({});

    // This use effect changes every time the toggle btn is clicked, because inputHidden changes in App.js
    useEffect(() => {
        let toggleSettings = {
            bgColour: 'gray',
            textColour: 'white',
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

    return (
        <>
            <div className="p-2" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'darkred'}}>
                <button className="btn btn-secondary"
                    style={{
                        border: "1px solid black", backgroundColor: `${toggleBtnSettings.bgColour}`,
                        textColour: `${toggleBtnSettings.textColour}`
                    }}
                    onClick={toggleInput}>{toggleBtnSettings.text}</button>

                <button>A</button>
                <button>A</button>
            </div>
            
            
        </>
    )
}
export default Options;