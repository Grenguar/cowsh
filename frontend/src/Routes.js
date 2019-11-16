import React, { Component } from 'react'
import { Router } from '@reach/router'
import { createGlobalStyle } from 'styled-components'
import App from './App'
import typography from './utils/typography'
import fontFiles from './fonts/index.js'
import GodMode from './components/GodMode'
import WishList from './components/WishList'

const GlobalStyles = createGlobalStyle`
 ${typography}

:root {
  --main-color: #0055FF;
  --bg-color: #f8f8f8;
}

body,html {
    margin: 0px;
    padding: 0px;
}
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background: var(--bg-color);
}

  button {
    min-width: 75px;
    min-height: 25px;
    background: var(--main-color);
    padding: 0;
    cursor: pointer;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
    &:disabled {
      background: lightgrey;
      cursor: auto;
    }
  }

 @font-face {
    font-family: "Gotham Rounded";
    font-style: normal;
    font-weight: bold;
    src: local("Gotham Rounded Bold"), local("GothamRounded-Bold"), url(${
      fontFiles.GothamRoundedBold
    }) format("opentype");
  }  
  @font-face {
    font-family: "Gotham Rounded";
    font-style: normal;
    font-weight: 500;
    src: local("Gotham Rounded Medium"), local("GothamRounded-Medium"), url(${
      fontFiles.GothamRoundedMedium
    }) format("opentype");
  }  
  /* @font-face {
    font-family: "Gotham Rounded";
    font-style: normal;
    font-weight: normal;
    src: local("Gotham Rounded Book"), local("GothamRounded-Book"), url(${
      fontFiles.GothamRoundedBook
    }) format("opentype");
  }   */
  @font-face {
    font-family: "Gotham Rounded";
    font-style: normal;
    font-weight: 200;
    src: local("Gotham Rounded Light"), local("GothamRounded-Light"), url(${
      fontFiles.GothamRoundedLight
    }) format("opentype");
  } 
`

class Routes extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyles />
        <Router>
          <WishList path="wishlist" />
          <GodMode path="godmode" />
          <App path="/*" />
        </Router>
      </React.Fragment>
    )
  }
}

export default Routes
