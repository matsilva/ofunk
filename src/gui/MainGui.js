import React from 'react';
import ProjectTypeEnum from './enum/ProjectTypeEnum';
import Splash from './splash/Splash';
import './css/semantic-ui/semantic.less';
import Meme from './meme/Meme';

const SPLASH = 'splash';
export default class MainGui extends React.Component {
    state = {
        view: SPLASH
    };
    selectProjectType = type => {
        this.setState({ view: type });
    };
    render() {
        switch (this.state.view) {
            case ProjectTypeEnum.MEME:
                return <Meme />;

            case SPLASH:
            default:
                return <Splash selectProjectType={this.selectProjectType} />;
        }
    }
}
