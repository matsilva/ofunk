import React from 'react';
import translate from '../i18n/translate';
import { Button, Progress } from 'semantic-ui-react';
import './Meme.less';

const t = translate(['meme']);
export default class Meme extends React.Component {
    topText = React.createRef();
    bottomText = React.createRef();
    state = {
        topText: t('topText'),
        bottomText: t('bottomText')
    };
    handleTextChange = e => {
        this.setState({
            topText: e.target.value
        });
    };
    toggleTextDrawer = () => {
        console.log('toggled');
    };
    render() {
        return (
            <div className="editor-container meme">
                <div className="editor-left flex flex-column justify-between items-center">
                    <div className="meme-player-container flex justify-center items-center">
                        <div className="meme-player">
                            <textarea
                                onChange={this.handleTextChange}
                                onFocus={this.toggleTextDrawer}
                                className="meme-top-text f2"
                                value={this.state.topText}
                            />
                            <div className="meme-media-container flex justify-center items-center">
                                <div className="add-media-container">
                                    <Button color="grey" className="add-media-button">
                                        {t('addMedia')}
                                    </Button>
                                </div>
                            </div>
                            <div contentEditable className="meme-bottom-text f2">
                                {t('bottomText')}
                            </div>
                        </div>
                    </div>
                    <div className="bottom-action-bar flex justify-between items-center pv2">
                        <Button icon="play" color="blue" className="action-left-button" />
                        <Progress percent={32} inverted color="blue" progress />
                        <Button color="purple" className="action-right-button">
                            {t('create')}
                        </Button>
                    </div>
                </div>
                <div className="editor-right" />
            </div>
        );
    }
}
