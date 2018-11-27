function memeTextTop(textInfo, padding) {
    return (
        "drawtext=text='" +
        textInfo.text +
        "':fontfile=" +
        textInfo.fontFile +
        ':fontsize=' +
        textInfo.fontSize +
        ':x=(w-tw)/2:y=(' +
        padding / 2 +
        '-th)/2'
    );
}

function memeTextBottom(textInfo, padding) {
    return (
        "drawtext=text='" +
        textInfo.text +
        "':fontfile=" +
        textInfo.fontFile +
        ':fontsize=' +
        textInfo.fontSize +
        ':x=(w-tw)/2:y=h-' +
        padding / 4 +
        '-(th/2)'
    );
}

module.exports = {
    memeTextTop,
    memeTextBottom,
};
