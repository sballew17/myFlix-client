import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button, Container } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import './registration-view.scss';

export function RegisterView(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('https://sam-superhero-movie-project.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthdate: birthdate
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
                alert("You have sucessfully registered.");
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    alert('The value you entered is not valid.')
                }
            });
        console.log(username, password, email, birthdate);
    };

    return (
        <React.Fragment>
            <Form className='register-form'>
                <h1 className='register-header'>Welcome to myFlix!</h1>
                <p className="register-header">
                    Login in&nbsp;
                    <Link to={`/login`}>here</Link>
                </p>
                <Form.Group controlId='formBasicText'>
                    <Form.Label size='lg'>Username</Form.Label>
                    <Form.Control
                        type='text'
                        size='lg'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter usename'
                    />
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label size='lg'>Email</Form.Label>
                    <Form.Control
                        type='email'
                        size='lg'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter email'
                    />
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                    <Form.Label size='lg'>Password</Form.Label>
                    <Form.Control
                        type='password'
                        size='lg'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter new password'
                    />
                </Form.Group>
                <Form.Group controlId='formBasicConfirmPassword'>
                    <Form.Label size='lg'>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        size='lg'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm your password'
                    />
                </Form.Group>
                <Form.Group controlId='formBasicDate'>
                    <Form.Label size='lg'>Birthdate</Form.Label>
                    <Form.Control
                        type='date'
                        size='lg'
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        placeholder='Enter your birthdate'
                    />
                </Form.Group>
                <Button type='button' variant='success' onClick={handleRegister}>Submit</Button>
                <br />
                <Link to={`/login`}>
                    <Button className='login-button' type='button' variant='dark'>
                        Already Registered?
                    </Button>
                </Link>
            </Form>
        </React.Fragment>
    );
}
RegisterView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired
    }),
};