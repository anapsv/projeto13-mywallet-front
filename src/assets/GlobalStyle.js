import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
    }
 
   html, body {
        width: 100%;
        height: 100%;
        font-family: 'Raleway', sans-serif;
        background-color: #8C11BE;
    }
`;

//font-family: 'Saira Stencil One', cursive;
//font-family: 'Raleway', sans-serif;

export default GlobalStyle;