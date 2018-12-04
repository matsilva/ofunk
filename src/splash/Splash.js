import React from 'react';
import PropTypes from 'prop-types';
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
                <div className="header flex justify-between mt5 mb5 ph5">
                    <h1>OFUNK</h1>
                </div>
                <div className="module-container flex flex-wrap justify-around">
                    <div className="module flex flex-wrap">
                        <h2 className="module-title">Create New</h2>
                        {projectTypes.map((p, i) => {
                            return (
                                <button
                                    key={i + 'splash-button'}
                                    onClick={this.selectProjectType.bind(this, p.type)}
                                    className={`create-button ${p.type === 'open' ? 'project' : ''} ${
                                        p.comingSoon ? 'coming-soon' : ''
                                    }`}>
                                    {p.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="module flex flex-wrap">
                        <h2 className="module-title">Recent</h2>
                    </div>
                </div>
            </div>
        );
    }
}

Splash.propTyps = {
    selectProjectType: PropTypes.func
};
