function SongButtons({onPlay, onStop})
{
    return (
        <nav className="align-center">
            <button id="play" className="btn btn-primary m-1" onClick={onPlay}>Play</button>
            <button id="stop" className="btn btn-danger" onClick={onStop}>Stop</button>
        </nav>
    )
}
export default SongButtons;