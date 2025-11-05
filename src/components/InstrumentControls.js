function InstrumentControls({instrumentName})
{
    const muteBtnId = `mute_${instrumentName}`;

    return (
        <>
            <h3>{instrumentName} Controls</h3>
            <div className="input-group">
                <input className="m-2" type="checkbox" id={muteBtnId}></input>
                <label>Mute {instrumentName}</label>
            </div>
        </>
    )
}
export default InstrumentControls;