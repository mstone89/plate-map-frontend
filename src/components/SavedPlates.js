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
                console.log(this.state.savedPlates);
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
        console.log(this.state);
        return (
            <div className="saved-plates">
                <h3>Saved Plates</h3>
                Sort by:
                <Button onClick={() => {this.sortByCellCount(this.state.savedPlates)}}>Cell Count</Button>
                <Button onClick={() => {this.sortByDilutions(this.state.savedPlates)}}>Dilutions</Button>
                <Button onClick={() => {this.sortBySampleReps(this.state.savedPlates)}}>Sample Reps</Button>
                <Button onClick={() => {this.sortByStandardCurveReps(this.state.savedPlates)}}>SC Reps</Button>
                {this.state.savedPlates.map((plate, index) => {
                    const link = `/view/${plate.id}`;
                    return (
                        <Media key={index}>
                            <Media.Body>
                                <Link to={link}><h5>{plate.name}</h5></Link>
                                <p>
                                    Samples: {plate.samples} /
                                    Standard Curve Reps: {plate.sc_reps} /
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
