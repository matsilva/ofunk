const { exec } = require('child_process');
const getVideoConfig = require('./config/getVideoConfig');
const draw = require('./draw');
const path = require('path');

function memeConfigFromData(data) {
    const { saveFilePath, media, topText, bottomText, color } = data;
    const validateData = () => {
        //TODO: Add proper validation
        return null;
    };
    const err = validateData();
    return {
        err,
        memeConfig: {
            saveFilePath,
            media,
            topText,
            bottomText,
            color
        }
    };
}

module.exports = async function meme(videoData) {
    try {
        const { err, memeConfig } = memeConfigFromData(videoData);
        if (err) {
            return err;
        }
        const { topText, bottomText, media, color, saveFilePath, padding = 100 } = memeConfig;
        const cmd = `ffmpeg -y -i ${media.path} -filter_complex "[0:v]pad=iw:ih+${padding}:0:(oh-ih)/2:color=${
            color[0].value
        }, ${draw.memeTextTop(topText)}, ${draw.memeTextBottom(bottomText)}" ${saveFilePath}`;

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
