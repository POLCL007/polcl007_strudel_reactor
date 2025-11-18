import InstrumentControls from './InstrumentControls.js';

function DJControls({ SongObj, onVolumeChange }) {
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
                            step="0.01" defaultValue={volumeValue} onChange={onVolumeChange}></input>
                    </div>
                </div>
            </div>

            <div className="row">

                <div className="col-4">
                    <InstrumentControls instrumentName="bassline"/>
                </div>

                <div className="col-4">
                    <InstrumentControls instrumentName="main_arp" />
                </div>    
            </div>
        </>
    )
}
export default DJControls;