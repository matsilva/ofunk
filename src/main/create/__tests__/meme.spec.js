const fs = require('fs');
const path = require('path');
const meme = require('../meme');
const getVideoConfig = require('../config/getVideoConfig');
const { execSync } = require('child_process');

describe('meme', () => {
    let videoConfig;
    beforeEach(() => {
        const exampleMedia = path.resolve(__dirname, '../../../../', 'examples/media/Christmas_Tree.mp4');
        if (fs.existsSync(exampleMedia)) {
            fs.unlinkSync(exampleMedia);
        }
        try {
            const curlCmd = `curl -L https://pixabay.com/en/videos/download/video-19290_tiny.mp4?attachment --output ${exampleMedia}`;
            execSync(curlCmd);
        } catch (error) {
            throw error;
        }
        const jsonFile = path.resolve(__dirname, '../../../../examples/meme.json');
        const { err: configErr, videoConfig: config } = getVideoConfig(jsonFile);
        if (configErr) {
            throw configErr;
        }
        videoConfig = config;
    });
    it('should create video from config', async () => {
        try {
            const memeErr = await meme(videoConfig);
        } catch (error) {
            throw error;
        }
        expect(fs.statSync(videoConfig.saveFilePath).isFile());
    });
    it('should call lifecycle callback fns with correct args', async () => {
        const lifecycleCallbacks = {
            onProgress: jest.fn()
        };
        try {
            const memeErr = await meme(videoConfig, lifecycleCallbacks);
        } catch (error) {
            throw error;
        }
        expect(onProgress).toBeCalled();
        expect(onDone).toBeCalled();
    });
});
