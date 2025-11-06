function SongButtons({onPlay, onStop, isPlaying})
{
    // If the song isn't playing, only display a Play button. There shouldnt be a stop button
    if (!isPlaying) {
        return (
            <nav className="align-center">
                <button id="play" className="btn btn-primary m-1" onClick={onPlay}>Play</button>
            </nav>
        )
    }
    // If playing, only show a stop button
    else {
        return (
            <nav className="align-center">
                <button id="stop" className="btn btn-danger" onClick={onStop}>Stop</button>
            </nav>
        )
    }
}
export default SongButtons;