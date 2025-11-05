function SongButtons({onPlay, onStop})
{
    return (
        <div className="col-md-4">
            <nav>
                <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
                <button id="stop" className="btn btn-outline-danger" onClick={onStop}>Stop</button>
            </nav>
        </div>
    )
}
export default SongButtons;