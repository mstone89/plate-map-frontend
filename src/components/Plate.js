import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';
import Helpers from './helper';

const API_URI = process.env.REACT_APP_BACKEND_URI;

class Plate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plate: [],
            redirect: false
        }
    }

    componentDidMount = () => {
        this.fetchPlate();
    }

    fetchPlate = () => {
        const path = this.props.location.pathname;
        const id = path.split('/')[2];
        fetch(`${API_URI}/plates/${id}`)
            .then(data => data.json())
            .then(jsonData => {
                this.setState({
                    plate: jsonData
                });
                let plateData = Helpers.generatePlateData(this.state.plate.dilutions, this.state.plate.samples, this.state.plate.replicates, this.state.plate.sc_reps);
                let gridData = Helpers.generateGrid(8, 12, plateData);
                Helpers.renderGrid(gridData, 800, 500, '#grid1', false);
                let plateData2 = Helpers.generatePlateData(this.state.plate.dilutions, this.state.plate.samples, this.state.plate.replicates, this.state.plate.sc_reps);
                let gridData2 = Helpers.generateGrid(12, 8, plateData2)
                Helpers.renderGrid(gridData2, 500, 800, '#grid2', true);

            })
            .catch(err => console.log('view plate error: ', err));
    }

    handleDelete = (id) => {
        fetch(`${API_URI}/plates/${this.state.plate.id}`, {
            method: 'DELETE'
        }).then(data => {
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
            <div className="grid-container">
                <h3 className="plate-title">{this.state.plate.name}</h3>
                <div id="grid1"></div>
                <div id="grid2"></div>
                <Card>
                    <Card.Body>
                        <Card.Header as="h5">{this.state.plate.name}</Card.Header>
                        <ListGroup>
                            <ListGroup.Item>Samples: <b>{this.state.plate.samples}</b></ListGroup.Item>
                            <ListGroup.Item>Standard Curve Reps: <b>{this.state.plate.sc_reps}</b></ListGroup.Item>
                            <ListGroup.Item>Replicates: <b>{this.state.plate.replicates}</b></ListGroup.Item>
                            <ListGroup.Item>Dilutions: <b>{this.state.plate.dilutions}</b></ListGroup.Item>
                            <ListGroup.Item>Cell Count: <b>{this.state.plate.cellcount}</b></ListGroup.Item>
                        </ListGroup>
                        <Button className="delete-btn" onClick={() => this.handleDelete(this.state.plate.id)}>Delete Plate</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Plate;
