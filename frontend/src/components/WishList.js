import React, { Component } from 'react'
import firebase from 'firebase'
import base from '../base'
import styled from 'styled-components'
import { wishColor, wishColorQuestion } from '../utils/colors'
import GodDisplayCard from './GodDisplayCard'
import WishDisplay from './WishDisplay'

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  min-width: 100vw;
  overflow: visible;
  grid-gap: 1rem;
  justify-content: center;
  justify-items: center;
  .title {
    color: rgb(80, 80, 80);
    font-weight: lighter;
    max-width: 600px;
    line-height: 1.5rem;
  }
  h4,
  hr {
    margin-bottom: 0;
    margin-block-end: 0;
  }
`

const Cards = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const PersonsWishes = styled.div`
  margin: 1rem 0;
  padding: 1rem 0;
  border-radius: 15px;
  max-width: 600px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 20px 40px;
  background: white;
`

const Wishes = styled.div`
  display: grid;
  overflow: visible;
  justify-content: center;
  align-content: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  background: blueviolet;
`
const Tasks = styled.div`
  background: orange;
  display: grid;
  overflow: visible;
  justify-content: center;
  align-content: center;
  justify-items: center;
  width: 100%;
  height: 100%;
`

class WishList extends Component {
  state = {
    parent: null,
    kid: null,
  }

  componentDidMount() {
    this.ref = base.syncState('app/parent', {
      context: this,
      state: 'parent',
      asArray: false,
      then: () => console.log(this.state.parent),
    })
    this.ref2 = base.syncState('app/kid', {
      context: this,
      state: 'kid',
      asArray: false,
      then: () => console.log(this.state.kid),
    })

    // On mount check for if user is already authenticaed
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  // Handle authentication with firebases incoming data about the user
  authHandler = authData => {
    const { uid, displayName } = authData.user
    this.setState({ name: displayName })
  }
  setBalance = balance => {
    const name = this.state.firebase[0]
    this.setState({
      firebase: {
        name: {
          balance: balance + 100,
        },
      },
    })
  }
  componentWillUnmount() {
    base.removeBinding(this.ref)
    base.removeBinding(this.ref2)
  }

  render() {
    return (
      <Content>
        <Wishes>1</Wishes>
        <Tasks>2</Tasks>
      </Content>
    )
  }
}

export default WishList
