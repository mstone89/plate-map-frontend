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
                    <h2>Generating Plates</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut lorem imperdiet, maximus justo ultricies, dictum metus. Phasellus consequat, leo non molestie luctus, metus lectus mollis risus, eu molestie lorem velit sit amet sapien. Cras ultricies interdum ipsum. Curabitur tristique urna vel eros tincidunt, sed elementum mauris condimentum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut lorem imperdiet, maximus justo ultricies, dictum metus. Phasellus consequat, leo non molestie luctus, metus lectus mollis risus, eu molestie lorem velit sit amet sapien. Cras ultricies interdum ipsum. Curabitur tristique urna vel eros tincidunt, sed elementum mauris condimentum.</p>
                </aside>
                <div className="right-column">
                    <Form onSubmit={this.handleSubmit}>
                        <h2 className="create-header">Create New Plates</h2>
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
