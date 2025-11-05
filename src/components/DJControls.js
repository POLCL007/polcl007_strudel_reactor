function DJControls({volumeValue, onVolumeChange}) {
    return (
        <>
            <div className="row mb-4">
                <div className="col-4">
                    <div className="input-group mt-3">
                        <span className="input-group-text">Set CPM</span>
                        <input type="text" className="form-control" placeholder="60" />
                    </div>

                    <label>Volume</label>
                    <input type="range" id="volume" className="form-range" min="0" max="1" step="0.01" defaultValue={volumeValue} onChange={onVolumeChange}></input>
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <h3>Bassline Controls</h3>
                    <div className="input-group">
                        <input className="m-2" type="checkbox" id="mute_bassline"></input>
                        <label>Mute bassline</label>
                    </div>
                </div>

                <div className="col-4">
                    <h3>main_arp </h3>
                    <div className="input-group">
                        <input className="m-2" type="checkbox" id="mute_main_arp"></input>
                        <label>Mute main_arp</label>
                    </div>
                </div>

                
            </div>
        </>
    )
}
export default DJControls;