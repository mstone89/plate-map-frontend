import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as d3 from "d3";
import Helpers from './helper';

const API_URI = process.env.REACT_APP_BACKEND_URI;

class ViewGeneratedPlate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            samples: 0,
            scReps: 0,
            replicates: 0,
            dilutions: 0,
            nameInput: ''
        }
    }

    componentDidMount = () => {
        const path = this.props.location.pathname;
        const parsePlate = path.split('/');
        const samples = parseInt(parsePlate[2]);
        const scReps = parseInt(parsePlate[3]);
        const replicates = parseInt(parsePlate[4]);
        const dilutions = parseInt(parsePlate[5]);
        this.setState({
            samples: this.state.samples + samples,
            scReps: this.state.scReps + scReps,
            replicates: this.state.replicates + replicates,
            dilutions: this.state.dilutions + dilutions
        });
        let data = Helpers.generatePlateData(dilutions, samples, replicates, scReps);
        let gridData = Helpers.generateGrid(8, 12, data);
        Helpers.renderGrid(gridData);
        console.log(this.state);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            nameInput: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let plate = {
            name: this.state.nameInput,
            samples: this.state.samples,
            sc_reps: this.state.scReps,
            replicates: this.state.replicates,
            dilutions: this.state.dilutions
        }
        this.handleSavePlate(plate);
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
            this.setState({
                nameInput: ''
            })
        })
        .catch(err => console.log('create plate error: ', err));
    }

    render() {
        return (
            <div>
                <div id="grid"></div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Save Plate</Form.Label>
                        <Form.Control
                            required
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
