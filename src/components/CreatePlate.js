import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import image from '../images/example_plate.png';

class CreatePlate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            sampleInput: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            sampleInput: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            redirect: true
        });
    }

    componentDidUpdate = () => {
        if (this.state.redirect) {
            this.setState({
                redirect: false,
                sampleInput: ''
            });
        }
    }

    render() {
        if (this.state.redirect) {
            const url = `/combos/${this.state.sampleInput}`;
            return <Redirect to={url} />;
        }

        return (
            <div className="main-container">
                <aside>
                    <h2>How It Works</h2>
                    <p>Sometimes the most difficult part of an experiment is that first step. Plate-Map is here to assit in planning out your assays without a lot of guesswork.  Simply input the number of samples you are testing, and Plate-Map does the rest.</p>
                    <p>Plate-Map uses a typical 96 well plate format, with a 7 point standard curve and up to 16 samples. With sample input, the app will suggest dilutions, replicates, and even well count, so you can maximize each and every experiment. It will offer two possible map options upon sample input.</p>
                    <p>Plate-Map is an experimental planning tool that will save money and increase efficiency for costly and time consuming assay work, a must have for any modern lab.</p>
                </aside>
                <div className="right-column">
                    <Form onSubmit={this.handleSubmit}>
                        <h2 className="create-header">Generating Plates</h2>
                        <Form.Group className="create-form">
                            <Form.Label>Number Of Samples:</Form.Label>
                            <Form.Control
                                required="please indicate number of samples"
                                type="number"
                                min="1"
                                max="16"
                                value={this.state.sampleInput}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button className="create-btn" variant="primary" type="submit">See Combinations</Button>
                    </Form>
                    <img className="example-plate" src={image} alt="example plate" />
                </div>
            </div>
        )
    }
}

export default CreatePlate;
