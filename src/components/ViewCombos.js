import React, { Component } from 'react';

class ViewCombos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            combos: []
        }
    }

    generatePlateCombos = (sampleNum) => {
        const standards = 8;
        const replicatesArray = [2, 3, 4, 5, 6];
        const dilutionsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (let i = 0; i < replicatesArray.length; i++) {
            for (let j = 0; j < dilutionsArray.length; j++) {
                let cellCount = 0;
                let standardReps = standards * replicatesArray[i];
                let sampleReps = sampleNum * replicatesArray[i];
                let dilutions = sampleReps * dilutionsArray[j];
                cellCount += standardReps + dilutions;
                if (cellCount <= 96) {
                    this.setState({
                        combos: this.state.combos.push({
                            replicates: replicatesArray[i],
                            dilutions: dilutionsArray[j],
                            samples: sampleNum,
                            cellCount: cellCount
                        })
                    });
                }
            }
        }
    }

    componentDidMount = () => {
        const path = this.props.location.pathname;
        const sampleNum = parseInt(path.split('/')[2]);
        this.generatePlateCombos(sampleNum);
    }

    render() {
        return (
            <div>plate combos</div>
        )
    }
}

export default ViewCombos;
