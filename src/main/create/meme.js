const { exec } = require('child_process');
const getVideoConfig = require('./config/getVideoConfig');
const draw = require('./draw');
const path = require('path');

module.exports = async function meme(videoConfigFile) {
    const { err, videoConfig } = getVideoConfig(videoConfigFile);
    if (err) {
        return err;
    }
    try {
        const { text, media, color, saveFilePath, padding = 100 } = videoConfig;
        const cmd =
            'ffmpeg -y -i ' +
            media[0].file +
            ' -filter_complex "[0:v]pad=iw:ih+' +
            padding +
            ':0:(oh-ih)/2:color=' +
            color[0].value +
            ', ' +
            draw.memeTextTop(text[0]) +
            ', ' +
            draw.memeTextBottom(text[1]) +
            '" ' +
            saveFilePath;

        const ffmpeg = exec(cmd);

        let ffmpegErr;
        ffmpeg.on('data', buffer => {
            console.log(buffer.toString());
        });

        ffmpeg.on('error', buffer => {
            console.log('ffmpeg err', buffer.toString());
            ffmpegErr = buffer.toString();
        });

        const waitForClose = () => {
            return new Promise((resolve, reject) => {
                ffmpeg.on('close', code => {
                    if (code !== 0) {
                        reject(new Error(ffmpegErr ? ffmpegErr : 'ffmpeg failed to create video'));
                    } else {
                        console.log('Video successfully created!');
                        console.log('    ', saveFilePath);
                        resolve();
                    }
                });
            });
        };
        await waitForClose();
        return null;
    } catch (error) {
        return error;
    }
};
