import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as d3 from "d3";

const API_URI = process.env.REACT_APP_BACKEND_URI;

class ViewGeneratedPlate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plateData: [],
            gridData: [],
            nameInput: ''
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

    handleChange = (e) => {
        this.setState({
            nameInput: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const path = this.props.location.pathname;
        const plateData = path.split('/');
        const samples = parseInt(plateData[2]);
        const replicates = parseInt(plateData[3]);
        const dilutions = parseInt(plateData[4]);
        let plate = {
            name: this.state.name,
            samples: samples,
            replicates: replicates,
            dilutions: dilutions
        }
        this.handleSavePlate(plate);
        this.setState({
            nameInput: ''
        });
    }

    handleSavePlate = (plate) => {
        fetch(`${API_URI}/plates`, {
            body: JSON.stringify(plate),
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(createdPlate => createdPlate.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log('create plate error: ', err));
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
            data = data.sort((a, b) => {
                if (a.color < b.color) {
                    return 1;
                }
                if (a.color > b.color) {
                    return - 1;
                }
                return 0;
            });
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
        let svgWidth = 800;
        let svgHeight = 500;

        let labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        labels = labels.reverse();

        let yScale = d3.scaleLinear()
            .domain([0, 7])
            .range([svgHeight - 120, 20]);

        let yAxis =  d3.axisLeft()
            .scale(yScale)
            .tickFormat((d) => { return labels[d] })

        let grid = d3.select('#grid')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)

        let row = grid.selectAll('.row')
            .data(data)
            .enter().append('g')
            .attr('transform', 'translate(98,50)')
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

        grid.append('g')
            .attr('transform', 'translate(70, 50)')
            .call(yAxis)
    }

    render() {
        return (
            <div>
                {this.state.gridData.length > 0 ? this.renderGrid(this.state.gridData) : '' }
                <div id="grid"></div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Save Plate</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="enter plate name here"
                            value={this.state.nameInput}
                            onChange={this.handleChange}
                        />
                        <Button type="submit" variant="outline-secondary">Save Plate</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default ViewGeneratedPlate;
