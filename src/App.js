import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import CreatePlate from './components/CreatePlate';
import Plate from './components/Plate';
import Plates from './components/Plates';
import SavedPlates from './components/SavedPlates';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router>
                    <nav>
                        <h1><Link to="/">Plate-Map</Link></h1>
                        <Link to="/"><Button>Create</Button></Link>
                        <Link to="/plates"><Button>Saved Plates</Button></Link>
                    </nav>
                    <Switch>
                        <Route exact path="/" component={CreatePlate} />
                        <Route path ="/plates" component={SavedPlates} />
                        <Route path ="/view/:id" component={Plate} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
