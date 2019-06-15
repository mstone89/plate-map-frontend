import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class CreatePlate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            samples: 0
        };
    }

    render() {
        return (
            <div className="main-container">
                <aside>
                    <h2>Generating Plates</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut lorem imperdiet, maximus justo ultricies, dictum metus. Phasellus consequat, leo non molestie luctus, metus lectus mollis risus, eu molestie lorem velit sit amet sapien. Cras ultricies interdum ipsum. Curabitur tristique urna vel eros tincidunt, sed elementum mauris condimentum.</p>
                </aside>
                <Form>
                    <h2>Create New Plates</h2>
                    <Form.Group>
                        <Form.Label>Samples:</Form.Label>
                        <Form.Control required type="number" />
                    </Form.Group>
                    <Button variant="primary" type="submit">See Combinations</Button>
                </Form>
            </div>
        )
    }
}


export default CreatePlate;
