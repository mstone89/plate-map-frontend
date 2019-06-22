import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Media } from 'react-bootstrap';
import SortButtons from './SortButtons';

class ViewCombos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            combos: [],
            sampleNum: ''
        }
    }

    generatePlateCombos = (sampleNum) => {
        const standards = 8;
        const combos = [];
        const standardRepsArray = [2, 3];
        const replicatesArray = [2, 3, 4, 5, 6];
        const dilutionsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (let h = 0; h < standardRepsArray.length; h++) {
            for (let i = 0; i < replicatesArray.length; i++) {
                for (let j = 0; j < dilutionsArray.length; j++) {
                    let cellCount = 0;
                    let standardReps = standards * standardRepsArray[h];
                    let sampleReps = sampleNum * replicatesArray[i];
                    let dilutions = sampleReps * dilutionsArray[j];
                    cellCount += standardReps + dilutions;
                    if (cellCount <= 96) {
                        combos.push({
                            scReps: standardRepsArray[h],
                            replicates: replicatesArray[i],
                            dilutions: dilutionsArray[j],
                            samples: sampleNum,
                            cellCount: cellCount
                        });
                    }
                }
            }
        }
        this.setState({
            combos: combos,
            sampleNum: sampleNum
        });
    }

    componentWillMount = () => {
        const path = this.props.location.pathname;
        const sampleNum = parseInt(path.split('/')[2]);
        this.generatePlateCombos(sampleNum);
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
            <div className="combo-results">
                <div>
                    <h3>Plate Combinations for: {this.state.sampleNum} Samples</h3>
                    <SortButtons
                        plateData={this.state.combos}
                        sortByCellCount={this.sortByCellCount}
                        sortByDilutions={this.sortByDilutions}
                        sortBySampleReps={this.sortBySampleReps}
                        sortByStandardCurveReps={this.sortByStandardCurveReps}
                    />
                </div>
                {this.state.combos.map((combo, index) => {
                    const link = `/view-generated-plate/${combo.samples}/${combo.scReps}/${combo.replicates}/${combo.dilutions}/${combo.cellCount}`;
                    return (
                        <Media key={index}>
                            <Media.Body>
                                <Link to={link}><h5>Plate Combination {index + 1}</h5></Link>
                                <p>
                                    Samples: <b>{combo.samples}</b> /
                                    Standard Curve Reps: <b>{combo.scReps}</b> /
                                    Sample Reps: <b>{combo.replicates}</b> /
                                    Dilutions: <b>{combo.dilutions}</b> /
                                    Well Count: <b>{combo.cellCount}</b>
                                </p>
                            </Media.Body>
                        </Media>
                    );
                })}
            </div>
        )
    }
}

export default ViewCombos;
