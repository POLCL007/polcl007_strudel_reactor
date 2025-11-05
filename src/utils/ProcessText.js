export default function ProcessText({inputText, volume})
{
    // Set gain of all instruments
    inputText = inputText.replaceAll("{VOLUME}", volume);
    

    return inputText;
}