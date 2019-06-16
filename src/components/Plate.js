import React, { Component } from 'react';

class Plate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plate: [],
            plateData: [],
            gridData: []
        }
    }

    componentDidMount = () => {
        this.fetchPlate()
    }

    fetchPlate = () => {
        const path = this.props.location.pathname;
        const id = path.split('/')[2];
        fetch(`http://localhost:3000/plates/${id}`)
            .then(data => data.json())
            .then(jsonData => {
                this.setState({
                    plate: jsonData
                });
                this.generatePlateData(this.state.plate.dilutions, this.state.plate.samples, this.state.plate.replicates);
            })
            .catch(err => console.log('view plate error: ', err));
    }

    generatePlateData = (plateDilution, plateSample, plateReplicates) => {
        let colors = [
            'tomato', 'orange', 'violet', 'cornflowerblue',
            'slateblue', 'mediumseagreen', 'aqua', 'chartreuse',
            'darkblue', 'darkcyan', 'darkgoldenrod', 'crimson',
            'deeppink', 'magenta', 'limegreen', 'red'
        ]

        // Given number of samples and replicates, duplicate samples
        const createSampleData = (sampleNum, replicates) => {
            let samples = [];

            for (let j = 0; j < replicates; j++) {
                for (let i = 0; i < sampleNum; i++) {
                    samples.push({
                        name: `sample ${i + 1}`,
                        color: colors[i]
                    });
                }
            }
            return samples;
        }

        // Add dilution to sample data
        const addDilution = (dilutionNum, sampleData) => {
            let dilutionData = [];
            for (let i = 0; i < dilutionNum; i++) {
                for (let j = 0; j < sampleData.length; j++) {
                    dilutionData.push(sampleData[j]);
                }
            }
            return dilutionData;
        }

        // Create standard curve data
        const standardCurveData = (replicates) => {
            let standards = [];

            for (let i = 0; i < replicates; i++) {
                for (let j = 0; j < 8; j++) {
                    if (j === 7) {
                        standards.push({
                            name: 'blank',
                            color: 'white'
                        });
                    } else {
                        standards.push({
                            name: `standard ${j + 1}`,
                            color: 'yellow'
                        });
                    }
                }
            }
            // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
            return standards.sort((a, b) => {
                if (a.name < b.name) { return 1 }
                if (a.name > b.name) { return - 1 }
                return 0;
            });
        }

        // Take all created data and combine it
        const createFinalData = (dilutionNum, sampleNum, replicates) => {
            let data = standardCurveData(replicates).concat(addDilution(dilutionNum, createSampleData(sampleNum, replicates)));
            if (data.length < 96) {
                let remaining = 96 - data.length;
                for (let i = 0; i < remaining; i++) {
                    data.push({
                        name: 'blank',
                        color: 'white'
                    });
                }
            }
            this.setState({
                plateData: data
            })
        }

        createFinalData(plateDilution, plateSample, plateReplicates);
    }

    render() {
        return (
            <div id="grid"></div>
        )
    }
}

export default Plate;
