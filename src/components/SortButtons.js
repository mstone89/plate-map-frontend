import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class SortButtons extends Component {
    render() {
        return (
            <div className="sort-buttons">
                Sort by (descending):
                <Button size="sm" onClick={() => {this.props.sortByCellCount(this.props.plateData)}}>Well Count</Button>
                <Button size="sm" onClick={() => {this.props.sortByDilutions(this.props.plateData)}}>Dilutions</Button>
                <Button size="sm" onClick={() => {this.props.sortBySampleReps(this.props.plateData)}}>Sample Reps</Button>
                <Button size="sm" onClick={() => {this.props.sortByStandardCurveReps(this.props.plateData)}}>SC Reps</Button>
            </div>
        )
    }
}

export default SortButtons;
