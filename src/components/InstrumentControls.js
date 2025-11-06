import '../utils/InstrumentControlsStyle.css';

function InstrumentControls({ instrumentName })
{
    const muteBtnId = `mute_${instrumentName}`;

    return (
        <div className="m-2 pt-2 controlsBlock">
            <h3>{instrumentName} Controls</h3>
            <div className="input-group" style={{justifyContent: 'center'}}>
                <input className="m-2" type="checkbox" id={muteBtnId}></input>
                <label>Mute {instrumentName}</label>
            </div>
        </div>
    )
}
export default InstrumentControls;