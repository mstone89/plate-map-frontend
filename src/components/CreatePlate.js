import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

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
                </aside>
                <Form onSubmit={this.handleSubmit} inline>
                    <h2>Create New Plates</h2>
                    <Form.Group>
                        <Form.Label>Samples:</Form.Label>
                        <Form.Control
                            required="please indicate number of samples"
                            type="number"
                            min="1"
                            value={this.state.sampleInput}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">See Combinations</Button>
                </Form>
            </div>
        )
    }
}

export default CreatePlate;
