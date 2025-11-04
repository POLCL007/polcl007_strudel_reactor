function DJControls() {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text">Set CPM</span>
                <input type="text" className="form-control" placeholder="60" />
            </div>

            <label>Volume</label>
            <input type="range" id="volume" className="form-range" min="0" max="1" step="0.01"></input>

            <div className="input-group">
                <input type="checkbox" id="mute_bassline"></input>
                <label>Mute bassline</label>
            </div>

            <div className="input-group">
                <input type="checkbox" id="mute_main_arp"></input>
                <label>Mute main_arp</label>
            </div>
        </>
    )
}
export default DJControls;