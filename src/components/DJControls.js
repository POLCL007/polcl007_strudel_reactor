import './Styling.css';

function DJControls({ songText, setSongText, volume, adjustVolume }) {

    const changeBpm = ((e) => {
        let newBpm = e.target.value;

        const newSongText = songText.replace(/setcps\([^)]*\)/, `setcps(${newBpm}/60/4)`);
        setSongText(newSongText);
    });


    return (
        <>
            <div className="row mb-3 p-3 shelfRow">
                <div className="col-4 pt-3">
                    <h2>Main Controls</h2>
                </div>
                <div className="col-4">
                    <div className="input-group mt-3">
                        <span className="input-group-text">Set CPM</span>
                        <input type="text" className="form-control" placeholder="60" onChange={changeBpm} />
                    </div>
                </div>

                <div className="col-4">
                    <div className="col-3">
                        <span className="input-group-text">Volume</span>
                    </div>
                    <div className="col-12">
                        <input type="range" id="volume" className="form-range" min="0" max="1"
                            step="0.01" defaultValue={volume} onChange={adjustVolume}></input>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DJControls;