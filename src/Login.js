import axios from 'axios';
import React from 'react';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import UserContext from './contexts/UserContext';

export default function Login() {

    const {setUser} = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function signIn(event) {

        event.preventDefault();

        const loginInfo = {
            email,
            password
        };

        const request = axios.post('http://localhost:5000/login', loginInfo);

        request.then(response => {
            setEmail("");
            setPassword("");
            console.log(response.data);
            setUser(
                {   
                    name: response.data.name,
                    token: response.data.token,
                },
            );
            navigate("/transactions");
        });

        request.catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
                alert("Email ou senha inválidos, tente novamente.");
            }
        });

    };

    return (
        <Container>
            <h1>MyWallet</h1>
            <Form onSubmit={signIn}>
                <Input
                    type='email'
                    placeholder='E-mail'
                    name='email'
                    onChange={ e => setEmail(e.target.value) }
                    value={ email }
                    required
                />
                <Input
                    type='password'
                    placeholder='Senha'
                    name='password'
                    onChange={ e => setPassword(e.target.value) }
                    value={ password }
                    required
                />
                <Button type='submit'>Entrar</Button>
            </Form>
            <StyledLink to='/signup'>Primeira vez? Cadastre-se!</StyledLink>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        color: #FFFFFF;
        margin-top: 160px;
        margin-bottom: 40px;
    }

`

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Input = styled.input`
    width: 90%;
    height: 58px;
    border-radius: 5px;
    font-size: 20px;
    color: #000000;
    margin-bottom: 13px;
    padding-left: 15px;
    border: none;
`

const Button = styled.button`
    width: 90%;
    height: 45px;
    background-color: #A328D6;
    border-radius: 5px;
    border: none;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;
`
const StyledLink = styled(Link)`
    margin-top: 36px;
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
    text-decoration: none;
`