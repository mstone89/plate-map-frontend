import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';

class SavedPlates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedPlates: []
        };
    }

    fetchSavedPlates = () => {
        fetch('http://localhost:3000/plates')
            .then(data => data.json())
            .then(jsonData => {
                console.log(jsonData);
                this.setState({
                    savedPlates: jsonData
                });
            });
    }

    componentDidMount = () => {
        this.fetchSavedPlates();
    }

    render() {
        return (
            <div className="saved-plates">
                <h3>Saved Plates</h3>
                {this.state.savedPlates.map((plate, index) => {
                    const link = `/view/${plate.id}`;
                    return (
                        <Media key={index}>
                            <Media.Body>
                                <Link to={link}><h5>{plate.name}</h5></Link>
                                <p>
                                    Samples: {plate.samples} /
                                    Replicates: {plate.replicates} /
                                    Dilutions: {plate.dilutions}
                                </p>
                            </Media.Body>
                        </Media>
                    );
                })}
            </div>
        );
    }
}

export default SavedPlates;
