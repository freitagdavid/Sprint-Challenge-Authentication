import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import JokesList from './components/jokesList/JokesList';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <nav>
                        <NavLink to="/login">Log in</NavLink>
                        <NavLink to="/register">Register</NavLink>
                        <NavLink to="/jokes">Jokes</NavLink>
                    </nav>
                </header>
                <main>
                    <Route path="/" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/jokes" component={JokesList} />
                </main>
            </div>
        );
    }
}

export default App;
