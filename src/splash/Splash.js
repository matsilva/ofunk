import React from 'react';
import PropTypes from 'prop-types';
import { Popup, Message } from 'semantic-ui-react';
import './Splash.less';
import ProjectTypeEnum from '../enum/ProjectTypeEnum';
import translate from '../i18n/translate';

const t = translate(['splash', 'projectTypes']);

const { MEME, WORD_STORY, WATERMARK, PROMO, ROTATE, OPEN } = ProjectTypeEnum;

const projectTypes = [
    { type: MEME, label: t(MEME), comingSoon: false },
    { type: OPEN, label: t(OPEN), comingSoon: false },
    { type: WORD_STORY, label: t(WORD_STORY), comingSoon: true },
    { type: WATERMARK, label: t(WATERMARK), comingSoon: true },
    { type: PROMO, label: t(PROMO), comingSoon: true },
    { type: ROTATE, label: t(ROTATE), comingSoon: true }
];

export default class Splash extends React.Component {
    selectProjectType = type => {
        this.props.selectProjectType(type);
    };
    render() {
        return (
            <div className="splash flex flex-column justify-between">
                <div className="header flex justify-between mt5 mb5 ph3">
                    <div className="logo-container">
                        <img alt="ofunk logo" src="./images/ofunk-logo.png" />
                    </div>
                </div>
                <div className="module-container flex flex-wrap justify-between">
                    <div className="module flex flex-wrap ph3">
                        <h2 className="module-title">{t('createNew')}</h2>
                        {projectTypes.map((p, i) => {
                            if (p.comingSoon) {
                                return (
                                    <Popup
                                        key={`${i}-splash-button`}
                                        inverted
                                        position="top center"
                                        trigger={
                                            <button
                                                onClick={this.selectProjectType.bind(this, p.type)}
                                                className="create-button coming-soon">
                                                {p.label}
                                            </button>
                                        }
                                        content="Coming soon..."
                                    />
                                );
                            }
                            return (
                                <button
                                    key={`${i}splash-button`}
                                    onClick={this.selectProjectType.bind(this, p.type)}
                                    className={`create-button ${p.type === 'open' ? 'project' : ''}
                                    `}>
                                    {p.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="module flex flex-wrap ph3">
                        <h2 className="module-title">Recent</h2>
                    </div>
                </div>
                <div className="footer flex justify-center mb3">
                    <Message compact color="black" size="small">
                        {`${t('love')} `}
                        <a target="_blank" href="https://twitter.com/matsilva">
                            @matsilva
                        </a>
                    </Message>
                </div>
            </div>
        );
    }
}

Splash.propTypes = {
    selectProjectType: PropTypes.func
};
