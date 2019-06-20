import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import CreatePlate from './components/CreatePlate';
import Plate from './components/Plate';
import ViewCombos from './components/ViewCombos';
import SavedPlates from './components/SavedPlates';
import ViewGeneratedPlate from './components/ViewGeneratedPlate';
import image from './images/logo-circles.png';

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Router>
                    <nav>
                        <div className="logo-container">
                            <img src={image} alt="logo" />
                            <h1 className="logo"><Link to="/">Plate-Map</Link></h1>
                        </div>
                        <div className="nav-buttons">
                            <Link to="/"><Button className="nav-button">Create</Button></Link>
                            <Link to="/plates"><Button className="nav-button">Saved Plates</Button></Link>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path="/" component={CreatePlate} />
                        <Route path="/plates" component={SavedPlates} />
                        <Route path="/view/:id" component={Plate} />
                        <Route path="/combos/:sampleInput" component={ViewCombos} />
                        <Route path="/view-generated-plate/:samples/:replicates/:dilutions" component={ViewGeneratedPlate} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
