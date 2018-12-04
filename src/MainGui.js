import React from 'react';
import ProjectTypeEnum from './enum/ProjectTypeEnum';
import Splash from './splash/Splash';
import './css/semantic-ui/semantic.less';

export default class MainGui extends React.Component {
    state = {
        view: 'splash'
    };
    selectProjectType = type => {
        this.setState({ view: type });
    };
    render() {
        switch (this.state.view) {
            case ProjectTypeEnum.MEME:
                return 'This is a meme';

            case 'splash':
            default:
                return <Splash selectProjectType={this.selectProjectType} />;
        }
    }
}
