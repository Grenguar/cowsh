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
  state = {
    uid: '',
    name: '',
    loading: false,
  }

  componentDidMount() {
    // On mount check for if user is already authenticaed
    this.setState({ loading: true })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
      this.setState({ loading: false })
    })
  }

  // Handle authentication with firebases incoming data about the user
  authHandler = authData => {
    console.log(authData)
    const { uid, displayName } = authData.user
    this.setState({ uid, name: displayName, loading: false })
  }

  logout = async () => {
    console.log('LOGGING OUT')
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }

  authenticate = async () => {
    this.setState({ loading: true })
    const authProvider = new firebase.auth[`GoogleAuthProvider`]()
    const signedIn = await firebase.auth().signInWithRedirect(authProvider)
  }
  render() {
    if (!this.state.uid) {
      return <Content>{this.state.loading ? <h1>Loading...</h1> : <Login authenticate={this.authenticate} />}</Content>
    }

    return <Main logout={this.logout} uid={this.state.uid} name={this.state.name} />
  }
}

export default App
