const getVideoConfig = require('./config/getVideoConfig');

module.exports = function slideShow(videoConfigFile) {
    const { err, videoConfig } = getVideoConfig(videoConfigFile);
    if (err) {
        return err;
    }
};
