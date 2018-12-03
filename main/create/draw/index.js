function memeTextTop(textInfo) {
    return (
        "drawtext=text='" +
        textInfo.text +
        "':fontfile=" +
        textInfo.fontFile +
        ':fontsize=' +
        textInfo.fontSize +
        ':x=(w-tw)/2:y=(' +
        textInfo.padding / 2 +
        '-th)/2'
    );
}

function memeTextBottom(textInfo) {
    return (
        "drawtext=text='" +
        textInfo.text +
        "':fontfile=" +
        textInfo.fontFile +
        ':fontsize=' +
        textInfo.fontSize +
        ':x=(w-tw)/2:y=h-' +
        textInfo.padding / 4 +
        '-(th/2)'
    );
}

module.exports = {
    memeTextTop,
    memeTextBottom
};
