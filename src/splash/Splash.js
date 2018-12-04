import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';
import './Splash.css';
import ProjectTypeEnum from '../enum/ProjectTypeEnum';

const projectTypes = [
    { type: ProjectTypeEnum.MEME, label: 'Meme', comingSoon: false },
    { type: 'open', label: 'Open Project', comingSoon: false },
    { type: ProjectTypeEnum.WORD_STORY, label: 'Word Story', comingSoon: true },
    { type: ProjectTypeEnum.WATERMARK, label: 'Watermark', comingSoon: true },
    { type: ProjectTypeEnum.PROMO, label: 'Promo', comingSoon: true },
    { type: ProjectTypeEnum.ROTATE, label: 'Rotate', comingSoon: true }
];

export default class Splash extends React.Component {
    selectProjectType = type => {
        this.props.selectProjectType(type);
    };
    render() {
        return (
            <div className="splash">
                <div className="header flex justify-between mt5 mb5 ph3">
                    <div className="logo-container">
                        <img alt="ofunk logo" src="./images/ofunk-logo.png" />
                    </div>
                </div>
                <div className="module-container flex flex-wrap justify-between">
                    <div className="module flex flex-wrap ph3">
                        <h2 className="module-title">Create New</h2>
                        {projectTypes.map((p, i) => {
                            if (p.comingSoon) {
                                return (
                                    <Popup
                                        key={i + 'splash-button'}
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
                                    key={i + 'splash-button'}
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
            </div>
        );
    }
}

Splash.propTypes = {
    selectProjectType: PropTypes.func
};
