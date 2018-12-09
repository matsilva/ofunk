const fs = require('fs');

module.exports = function getVideoConfig(filePath) {
    if (!filePath) {
        return {
            err: new Error('Did not specify a video config json file'),
            videoConfig: null
        };
    }

    try {
        const buffer = fs.readFileSync(filePath);
        const videoConfig = JSON.parse(buffer);
        return { err: null, videoConfig };
    } catch (error) {
        return {
            err: error,
            videoConfig: null
        };
    }
};
