import React from 'react';
import translate from '../i18n/translate';
import { Button, Progress } from 'semantic-ui-react';
import './Meme.less';

const t = translate(['meme']);
export default class Meme extends React.Component {
    render() {
        return (
            <div className="editor-container meme">
                <div className="editor-left flex flex-column justify-between items-center">
                    <div className="meme-player-container flex justify-center items-center">
                        <div className="meme-player">
                            <div contentEditable className="meme-top-text f2">
                                {t('topText')}
                            </div>
                            <div className="meme-media-container flex justify-center items-center">
                                <div className="add-media-container">
                                    <Button color="grey" content="Grey" className="add-media-button">
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
                        <Button icon="play" className="action-left-button" />
                        <Progress percent={32} inverted color="blue" progress />
                        <Button className="action-right-button">{t('create')}</Button>
                    </div>
                </div>
                <div className="editor-right" />
            </div>
        );
    }
}
