import './Styling.css';

function SongButtons({ onPlay, onStop, isPlaying })
{
    // If the song isn't playing, only display a Play button. There shouldnt be a stop button
    if (!isPlaying) {
        return (
            <button className="btn btn-primary" onClick={onPlay}>Play</button>
        )
    }
    // If playing, only show a stop button
    else {
        return (
            <button className="btn btn-danger songButton" onClick={onStop}>Stop</button>
        )
    }
}
export default SongButtons;