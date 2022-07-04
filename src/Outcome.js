import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { React, useContext, useState } from 'react';
import UserContext from './contexts/UserContext.js';
import { ThreeDots } from 'react-loader-spinner';
import dayjs from 'dayjs';

export default function LoginScreen() {

    const now = dayjs().locale("pt-br");

    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const { token } = user;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    function Send(event) {
        event.preventDefault();
        
        setIsLoading(true);
        
        const postTransaction = {
            value,
            description,
            type: "negative",
            date: now.format("DD/MM/YY")
        }

        const promise = axios.post('http://localhost:5000/transactions', postTransaction, config);

        promise.then(response => {
            setValue("");
            setDescription("");
            setIsLoading(false);
            navigate("/transactions");
        });
    }

    return (
        <>
            <Container>
                <h1>Nova Saída</h1>
                <ion-icon onClick={ () => navigate("/transactions") } name="arrow-back-circle-outline"></ion-icon>
                { isLoading ? (
                    <Form>
                        <input
                            disabled
                            id="value"
                            value={ value }
                            placeholder="Valor"
                            required
                            onChange={ (e) => setValue(e.target.value) }
                        />
                        <input
                            disabled
                            type="description"
                            id="description"
                            value={ description }
                            placeholder="Descrição"
                            required
                            onChange={ (e) => setDescription(e.target.value) }
                        />
                        <button
                            type="submit"
                            disabled
                            opacity={ 0.7 }>
                            { <ThreeDots color={ "#ffffff" } width={ 51 } /> }
                        </button>
                    </Form>
                ) : (
                    <Form onSubmit={ Send }>
                        <input
                            id="value"
                            value={ value }
                            placeholder="Valor"
                            required
                            onChange={ (e) => setValue(e.target.value) }
                        />
                        <input
                            type="description"
                            id="description"
                            value={ description }
                            placeholder="Descrição"
                            required
                            onChange={ (e) => setDescription(e.target.value) }
                        />
                        <button type="submit">Salvar saída</button>
                    </Form>
                ) }
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    justify-content: space-between;
    width: 100%;
    font-family: 'Lexend Deca', sans-serif;
    position: relative;
    
    h1{
        left: 18px;
        margin-bottom: 40px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        color: #FFFFFF;
        position: absolute;
    }

    ion-icon{
        color:white;
        right: 16px;
        font-size: 26px;
        position: absolute;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: 60px;
    
    input {
        width: 90%;
        height: 58px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        margin-bottom: 13px;
        border-radius: 5px;
        border: none; 
        padding-left: 11px;
        color: #000000;
    }

    button {
        width: 90%;
        font-family: 'Raleway';
        font-weight: 700;
        height: 46px;
        text-align: center;
        background-color: #A328D6;
        color: #FFFFFF;
        font-size: 21px;
        border: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`