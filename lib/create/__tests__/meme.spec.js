const fs = require('fs');
const path = require('path');
const meme = require('../meme');
const getVideoConfig = require('../config/getVideoConfig');
const { execSync } = require('child_process');

describe('meme', () => {
    beforeEach(() => {
        const exampleMedia = path.resolve(
            __dirname,
            '../../../',
            'examples/media/Christmas_Tree.mp4',
        );
        try {
            const curlCmd =
                'curl -L https://pixabay.com/en/videos/download/video-19290_tiny.mp4?attachment --output ' +
                exampleMedia;
            execSync(curlCmd);
        } catch (error) {
            throw error;
        }
    });
    it('should create video from config', async () => {
        const jsonFile = path.resolve(__dirname, '../../../examples/meme.json');
        const { err: configErr, videoConfig } = getVideoConfig(jsonFile);
        if (configErr) {
            throw configErr;
        }
        try {
            const memeErr = await meme(jsonFile);
        } catch (error) {
            throw error;
        }
        expect(fs.statSync(videoConfig.saveFilePath).isFile());
    });
});
