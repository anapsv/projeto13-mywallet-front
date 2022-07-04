import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResetCSS from './assets/ResetCSS';
import GlobalStyle from './assets/GlobalStyle';
import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import UserContext from './contexts/UserContext';
import { useState } from 'react';
import TransactionsScreen from './TransactionsScreen';
import Income from './Income';
import Outcome from './Outcome';

export default function App() {

    const [user, setUser] = useState();

    return (
        <>
            <UserContext.Provider value={ { user, setUser } }>
                <ResetCSS />
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={ <Login /> } />
                        <Route path='/signup' element={ <SignUp /> } />
                        <Route path='/transactions' element={ <TransactionsScreen /> } />
                        <Route path='/income' element={ <Income /> } />
                        <Route path='/outcome' element={ <Outcome /> } />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
};