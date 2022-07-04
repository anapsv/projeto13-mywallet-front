import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordEqual, setIsPasswordEqual] = useState(true);

    const navigate = useNavigate();

    function register(event) {

        event.preventDefault();

        if (password !== confirmPassword) {
            setIsPasswordEqual(false);
            return;
        } else {
            setIsPasswordEqual(true);
        }

        const signupInfo = {
            name,
            email,
            password,
            confirmPassword
        };

        console.log(signupInfo);
        const request = axios.post('http://localhost:5000/signup', signupInfo);

        request.then(response => {
            setEmail("");
            setName("");
            setConfirmPassword("");
            setPassword("");
            navigate("/");
            console.log(response.data);
        });

        request.catch((err) => {
            if (err.response.status === 409) {
                alert("Usuário já existente. Tente novamente!");
            }
        });
    };

    return (
        <Container>
            <h1>MyWallet</h1>
            <Form onSubmit={ register }>
                <Input
                    type='text'
                    placeholder='Nome'
                    name='name'
                    onChange={ e => setName(e.target.value) }
                    value={ name }
                    required
                />
                <Input
                    type='email'
                    placeholder='E-mail'
                    name='email'
                    onChange={ e => setEmail(e.target.value) }
                    value={ email }
                    required
                />
                <PasswordInput
                    type='password'
                    placeholder='Senha'
                    name='password'
                    onChange={ e => setPassword(e.target.value) }
                    value={ password }
                    required
                />
                <PasswordInput
                    type='password'
                    placeholder='Confirme a senha'
                    name='confirmPassword'
                    onChange={ e => setConfirmPassword(e.target.value) }
                    value={ confirmPassword }
                    required
                />

                { !isPasswordEqual ? (
                    <PasswordConfirmSpan>Senhas não são iguais!</PasswordConfirmSpan>
                ) : (
                    ''
                ) }

                <Button type='submit'>Cadastrar</Button>
            </Form>
            <StyledLink to='/'>Já tem uma conta? Entre agora!</StyledLink>
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
        margin-top: 95px;
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

const PasswordInput = styled(Input)`
  ${({ isPasswordEqual }) => {
        if (!isPasswordEqual) {
            return `
        border: 1px solid red;
      `;
        }
    }}
`;

const PasswordConfirmSpan = styled.span`
  color: red;
  font-weight: 700;
  font-size: 14px;
  line-height: 10px;
`;

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