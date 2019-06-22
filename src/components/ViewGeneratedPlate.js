import React, { Component } from 'react';
import { Button, Form, Card, ListGroup } from 'react-bootstrap';
import Helpers from './helper';
import image from '../images/SC-Color.png';

const API_URI = process.env.REACT_APP_BACKEND_URI;

class ViewGeneratedPlate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            samples: 0,
            scReps: 0,
            replicates: 0,
            dilutions: 0,
            cellcount: 0,
            nameInput: ''
        }
    }

    componentDidMount = () => {
        const path = this.props.location.pathname;
        console.log(path);
        const parsePlate = path.split('/');
        const samples = parseInt(parsePlate[2]);
        const scReps = parseInt(parsePlate[3]);
        const replicates = parseInt(parsePlate[4]);
        const dilutions = parseInt(parsePlate[5]);
        const cellcount = parseInt(parsePlate[6]);
        this.setState({
            samples: this.state.samples + samples,
            scReps: this.state.scReps + scReps,
            replicates: this.state.replicates + replicates,
            dilutions: this.state.dilutions + dilutions,
            cellcount: this.state.cellcount + cellcount
        });
        let data = Helpers.generatePlateData(dilutions, samples, replicates, scReps);
        let gridData = Helpers.generateGrid(8, 12, data);
        Helpers.renderGrid(gridData, 800, 500, '#grid', false);
        let plateData2 = Helpers.generatePlateData(dilutions, samples, replicates, scReps);
        let gridData2 = Helpers.generateGrid(12, 8, plateData2)
        Helpers.renderGrid(gridData2, 500, 800, '#grid2', true);
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
            dilutions: this.state.dilutions,
            cellcount: this.state.cellcount
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
            <div className="grid-container">
                <h3 className="plate-title">Generated Plate</h3>
                <div id="grid"></div>
                <div id="grid2"></div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="save-plate">
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
                <Card>
                    <Card.Body>
                        <Card.Header as="h5">Generated Plate</Card.Header>
                        <ListGroup>
                            <ListGroup.Item>Samples: <b>{this.state.samples}</b></ListGroup.Item>
                            <ListGroup.Item><img className="sc-yellow" src={image} alt="sc-color-yellow"/> Standard Curve Reps: <b>{this.state.scReps}</b></ListGroup.Item>
                            <ListGroup.Item>Replicates: <b>{this.state.replicates}</b></ListGroup.Item>
                            <ListGroup.Item>Dilutions: <b>{this.state.dilutions}</b></ListGroup.Item>
                            <ListGroup.Item>Cell Count: <b>{this.state.cellcount}</b></ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default ViewGeneratedPlate;
