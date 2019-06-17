import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import * as d3 from "d3";

class Plate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plate: [],
            plateData: [],
            gridData: [],
            redirect: false
        }
    }

    componentDidMount = () => {
        this.fetchPlate();
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
                this.generateGrid();
                this.renderGrid(this.state.gridData);
                console.log(this.state);
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

    generateGrid = () => {
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
            let finalData = this.state.plateData;
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
            this.setState({
                gridData: dataForGrid
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

        row.selectAll('.circle')
            .data((d) => { return d })
            .enter().append('circle')
            .attr('class', 'circle')
            .attr('cx', (d) => { return d.x + 25 })
            .attr('cy', (d) => { return d.y + 25 })
            .attr('r', 25)
            .style('fill', (d) => { return d.color })
            .style('stroke', (d) => {
                if (d.color === 'white') {
                    return '#aaa';
                }
            });
    }

    handleDelete = (id) => {
        fetch(`http://localhost:3000/plates/${this.state.plate.id}`, {
            method: 'DELETE'
        }).then(data => {
            console.log('deleted data');
        }).catch(err => console.log('delete plate error: ', err));
        this.setState({
            redirect: true
        });
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <div id="grid"></div>
                <Button onClick={() => this.handleDelete(this.state.plate.id)}>Delete Plate</Button>
            </div>
        );
    }
}

export default Plate;
