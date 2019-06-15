import React, { Component } from 'react';

class Plate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plate: []
        }
    }

    componentDidMount = () => {
        this.fetchPlate()
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
            })
            .catch(err => console.log('view plate error: ', err));
    }

    render() {
        return (
            <p>viewing a plate</p>
        )
    }
}

export default Plate;
