import React, { Component } from 'react';
import axios from 'axios';
const apiUrl = 'http://localhost:3300/api/';
class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: 'test1',
            password: 'test1',
        };
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();

        axios
            .post(`${apiUrl}login`, this.state)
            .then(res => {
                localStorage.setItem('jwt', res.data.token);
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                <form>
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        type="text"
                    />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                    <br />
                    <button type="submit" onClick={this.handleSubmit}>
                        Log in
                    </button>
                </form>
            </div>
        );
    }
}

export default Register;
