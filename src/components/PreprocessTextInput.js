function PreprocessTextInput({defaultText, onChange })
{
    return (
        <>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
            <textarea className="form-control" defaultValue={defaultText} onChange={onChange} rows="15" id="proc" ></textarea>
        </>
    )
}
export default PreprocessTextInput;