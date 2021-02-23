import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Institutes from './components/pages/Institutes';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
function App(){
    return(
        <Router>
            <NavBar/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/admin' exact component={Admin}/>
                <Route path='/institutes/:id' exact render={ props => <Institutes{...props}/> }/>
            </Switch>
            
        </Router>
    
    );
}

export default App;