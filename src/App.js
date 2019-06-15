import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CreatePlate from './components/CreatePlate';
import Plate from './components/Plate';
import Plates from './components/Plates';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <nav>
                        <h1><Link to="/">Plate-Map</Link></h1>
                        <button>Create</button>
                        <button>About</button>
                    </nav>
                    <div className="home-container">
                        <div></div>
                    </div>
                    <Switch>
                        <Route exact path="/" component={CreatePlate} />

                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;

// <Route path="/view/:id" component={Plate} />
// <Route path="/view/plates" component={Plates} />
