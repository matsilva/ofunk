import React from 'react';
import translate from '../i18n/translate';
import { Button, Progress } from 'semantic-ui-react';
import './Meme.less';
const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;

const t = translate(['meme']);

const TOP = 'top';
const BOTTOM = 'bottom';
export default class Meme extends React.Component {
    topTextRef = React.createRef();
    videoRef = React.createRef();
    bottomTextRef = React.createRef();
    mediaFilePicker = React.createRef();
    state = {
        topText: {
            text: t('topText'),
            fontFile: '/Users/evsilva22/Library/Fonts/AllerDisplay.ttf',
            fontSize: 72,
            padding: 200
        },
        bottomText: {
            text: t('bottomText'),
            fontFile: '/Users/evsilva22/Library/Fonts/AllerDisplay.ttf',
            fontSize: 72,
            padding: 200
        },
        media: null,
        color: [
            {
                value: '0xffffff'
            }
        ],
        duration: 30,
        currentPlayBackTime: 0,
        current: 30
    };
    componentWillUnmount() {
        clearInterval(this.playInterval);
    }
    handleMediaMouseOver = () => {
        console.log('mouseover');
    };
    handleMediaDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    handleMediaDrop = e => {
        e.preventDefault();
        e.stopPropagation();

        console.log(e.dataTransfer.files[0]);
        if (e.dataTransfer.files[0]) {
            this.setState({ media: e.dataTransfer.files[0] });
        }
    };
    onDurationChange = () => {
        this.setState({
            duration: this.videoRef.current.duration,
            currentPlayBackTime: 0
        });
    };
    handleTextChange = (e, textType) => {
        this.setState({
            [`${textType}Text`]: e.target.innerText
        });
    };
    handleMediaInput = () => {
        if (this.mediaFilePicker.current.files[0]) {
            this.setState({ media: this.mediaFilePicker.current.files[0] });
        }
    };
    handleAddMedia = () => {
        this.mediaFilePicker.current.click();
    };
    toggleTextDrawer = () => {
        console.log('toggled');
    };
    playInterval = null;
    playIntervalDuration = 50;
    onPlay = () => {
        this.videoRef.current.play();
        this.playInterval = setInterval(() => {
            if (this.videoRef.current.ended) {
                clearTimeout(this.playInterval);
            }
            this.setState({ currentPlayBackTime: this.videoRef.current.currentTime });
        }, this.playIntervalDuration);
    };
    onPause = () => {
        this.videoRef.current.pause();
        clearInterval(this.playInterval);
    };
    createVideo = () => {
        dialog.showSaveDialog(null, null, filename => {
            if (filename) {
                const { topText, bottomText, media, color } = this.state;
                const videoData = {
                    saveFilePath: filename,
                    topText,
                    bottomText,
                    color,
                    media
                };
                ipcRenderer.send('meme-create', videoData);
            }
        });
    };
    renderMedia = media => {
        if (media.type.includes('video')) {
            return (
                <video ref={this.videoRef} onDurationChange={this.onDurationChange}>
                    <source src={`file://${media.path}`} type={media.type} />
                </video>
            );
        } else if (media.type.includes('image')) {
            return <img src={media.path} alt={media.name} />;
        } else {
            return <p>{t('unknownMedia')}</p>;
        }
    };
    render() {
        const { media, currentPlayBackTime, duration } = this.state;
        return (
            <div className="editor-container meme">
                <div className="editor-left flex flex-column justify-between items-center">
                    <div className="meme-player-container flex justify-center items-center">
                        <div className="meme-player">
                            <div
                                contentEditable
                                ref={this.topTextRef}
                                onInput={e => this.handleTextChange(e, TOP)}
                                onFocus={this.toggleTextDrawer}
                                className="meme-top-text f2">
                                {t('topText')}
                            </div>
                            <div
                                className="meme-media-container flex justify-center items-center"
                                role="presentation"
                                onDrop={this.handleMediaDrop}
                                onDragOver={this.handleMediaDragOver}
                                onMouseOver={this.handleMediaMouseOver}>
                                {media ? (
                                    this.renderMedia(media)
                                ) : (
                                    <div className="add-media-container">
                                        <Button color="grey" className="add-media-button" onClick={this.handleAddMedia}>
                                            {t('addMedia')}
                                        </Button>
                                    </div>
                                )}
                                <input
                                    ref={this.mediaFilePicker}
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={this.handleMediaInput}
                                />
                            </div>
                            <div
                                contentEditable
                                ref={this.bottomTextRef}
                                onInput={e => this.handleTextChange(e, BOTTOM)}
                                onFocus={this.toggleTextDrawer}
                                className="meme-bottom-text f2">
                                {t('bottomText')}
                            </div>
                        </div>
                    </div>
                    <div className="bottom-action-bar flex justify-between items-center pv2">
                        <Button
                            disabled={Boolean(!media)}
                            circular
                            onClick={this.onPlay}
                            icon="play"
                            color="blue"
                            className="action-left-button"
                        />
                        <Progress percent={Math.floor(currentPlayBackTime / duration * 100)} inverted color="blue" />
                        <Button onClick={this.createVideo} color="purple" className="action-right-button">
                            {t('create')}
                        </Button>
                    </div>
                </div>
                <div className="editor-right" />
            </div>
        );
    }
}
