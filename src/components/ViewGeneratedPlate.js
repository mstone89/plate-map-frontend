import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import * as d3 from "d3";

// this.generatePlateData(this.state.dilutions, this.state.samples, this.state.replicates);

class ViewGeneratedPlate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plateData: [],
            gridData: []
        }
    }

    componentDidMount = () => {
        const path = this.props.location.pathname;
        const plateData = path.split('/');
        const samples = parseInt(plateData[2]);
        const replicates = parseInt(plateData[3]);
        const dilutions = parseInt(plateData[4]);
        this.generatePlateData(dilutions, samples, replicates);
        console.log(this.state);
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
            return this.generateGrid(data);
        }

        createFinalData(plateDilution, plateSample, plateReplicates);

    }

    generateGrid = (data) => {
        const finalizeGridData = (array) => {
            let finalArray = [];
            let x = 1;
            let y = 1;
            let width = 50;
            let height = 50;

            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                    finalArray.push({
                        name: array[i][j].name,
                        color: array[i][j].color,
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    });
                    x += width;
                }
                x = 1;
                y += height;
            }
            return finalArray;
        }

        const gridData = (rows, columns) => {
            let finalData = data;
            let dataForGrid = [];

            for (let row = 0; row < rows; row++) {
                dataForGrid.push([]);
                for (let column = 0; column < columns; column++) {
                    dataForGrid[row].push(finalData.shift());
                }
            }

            return dataForGrid;
        }

        let finalizedData = finalizeGridData(gridData(8, 12));

        const gridIt = (rows, columns, array) => {
            let dataForGrid = [];
            for (let row = 0; row < rows; row++) {
                dataForGrid.push([]);
                for (let column = 0; column < columns; column++) {
                    dataForGrid[row].push(array.shift());
                }
            }
            console.log(dataForGrid);
            this.setState({
                gridData: dataForGrid
            }, () => {
                console.log(this.state);
            })
        }

        gridIt(8, 12, finalizedData);
    }

    renderGrid = (data) => {
        let grid = d3.select('#grid')
            .append('svg')
            .attr('width', "612px")
            .attr('height', "408px")

        let row = grid.selectAll('.row')
            .data(data)
            .enter().append('g')
            .attr('class', 'row');

        row.selectAll('.square')
            .data((d) => { return d })
            .enter().append('rect')
            .attr('class', 'square')
            .attr('x', (d) => { return d.x })
            .attr('y', (d) => { return d.y })
            .attr('width', (d) => { return d.width })
            .attr('height', (d) => { return d.height })
            .style('fill', (d) => { return d.color })
            .style('stroke', '#000');
    }

    render() {
        return (
            <div>
                {this.state.gridData.length > 0 ? this.renderGrid(this.state.gridData) : '' }
                <div id="grid"></div>
                <Button>Save Plate</Button>
            </div>
        );
    }
}

export default ViewGeneratedPlate;
