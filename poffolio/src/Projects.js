import React, {Component} from 'react';
import PROJECTS from './data/projects';

class Projects extends Component {
    render () {
        return (
            <div>
                <h2>Hightlighted Projects</h2>
                <div>
                    {
                        PROJECTS.map(PROJECT => {
                            return(
                                <div>{PROJECT.description}</div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Projects;