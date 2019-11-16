import React, { Component } from 'react'
import styled from 'styled-components'
import Login from './components/Login'
import firebase from 'firebase'
import Main from './components/Main'

const Content = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-content: center;
`

class App extends Component {
  render() {
    return <Main />
  }
}

export default App
