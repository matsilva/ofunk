const getVideoConfig = require('./config/getVideoConfig');

module.exports = function slideShow(videoConfigFile) {
    const { err, videoConfigFile } = getVideoConfig(videoConfigFile);
    if (err) {
        return err;
    }
};
