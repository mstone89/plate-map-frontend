import React, { Component } from 'react';

class SavedPlates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedPlates: []
        };
    }

    fetchSavedPlates = () => {
        fetch('http://localhost:3000/plates')
            .then(data => data.json())
            .then(jsonData => {
                this.setState({
                    savedPlates: jsonData
                });
            });
    }

    componentDidMount = () => {
        this.fetchSavedPlates();
    }

    render() {
        return (
            <div className="saved-plates">
                <h3>Saved Plates</h3>
            </div>
        );
    }
}

export default SavedPlates;
