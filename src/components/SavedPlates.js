import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';
import SortButtons from './SortButtons';

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
                    <SortButtons
                        plateData={this.state.savedPlates}
                        sortByCellCount={this.sortByCellCount}
                        sortByDilutions={this.sortByDilutions}
                        sortBySampleReps={this.sortBySampleReps}
                        sortByStandardCurveReps={this.sortByStandardCurveReps}
                    />
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
