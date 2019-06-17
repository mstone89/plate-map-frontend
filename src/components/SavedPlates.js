import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';

const API_URI = process.env.REACT_APP_BACKEND_URI;

class SavedPlates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedPlates: []
        };
    }

    fetchSavedPlates = () => {
        fetch(`${API_URI}/plates`)
            .then(data => data.json())
            .then(jsonData => {
                this.setState({
                    savedPlates: jsonData
                });
                // console.log(this.state.savedPlates);
            })
            .catch(err => console.log('view plates error: ', err));
    }

    componentDidMount = () => {
        this.fetchSavedPlates();
    }

    render() {
        console.log(this.state);
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
