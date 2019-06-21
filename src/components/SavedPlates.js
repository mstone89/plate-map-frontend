import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Media, Button } from 'react-bootstrap';

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
                console.log(jsonData);
            })
            .catch(err => console.log('view plates error: ', err));
    }

    componentDidMount = () => {
        this.fetchSavedPlates();
    }

    sortByCellCount = (array) => {
        this.setState({
            combos: array.sort((a, b) => { return b.cellCount - a.cellCount })
        });
    }

    sortByDilutions = (array) => {
        this.setState({
            combos: array.sort((a, b) => { return b.dilutions - a.dilutions })
        });
    }

    sortBySampleReps = (array) => {
        this.setState({
            combos: array.sort((a, b) => { return b.replicates - a.replicates })
        });
    }

    sortByStandardCurveReps = (array) => {
        this.setState({
            combos: array.sort((a, b) => { return b.scReps - a.scReps })
        });
    }

    render() {
        return (
            <div className="saved-plates">
                <div>
                    <h3>Saved Plates</h3>
                    Sort by:
                    <Button size="sm" onClick={() => {this.sortByCellCount(this.state.savedPlates)}}>Cell Count</Button>
                    <Button size="sm" onClick={() => {this.sortByDilutions(this.state.savedPlates)}}>Dilutions</Button>
                    <Button size="sm" onClick={() => {this.sortBySampleReps(this.state.savedPlates)}}>Sample Reps</Button>
                    <Button size="sm" onClick={() => {this.sortByStandardCurveReps(this.state.savedPlates)}}>SC Reps</Button>
                </div>
                {this.state.savedPlates.map((plate, index) => {
                    const link = `/view/${plate.id}`;
                    return (
                        <Media key={index}>
                            <Media.Body>
                                <Link to={link}><h5>{plate.name}</h5></Link>
                                <p>
                                    Samples: <b>{plate.samples}</b> /
                                    Standard Curve Reps: <b>{plate.sc_reps}</b> /
                                    Replicates: <b>{plate.replicates}</b> /
                                    Dilutions: <b>{plate.dilutions}</b> /
                                    Cell Count: <b>{plate.cellcount}</b>
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
