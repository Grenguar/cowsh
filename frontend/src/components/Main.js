import React from 'react'
import firebase from 'firebase'
import base from '../base'
import styled from 'styled-components'
import AddCard from './AddCard'
import DisplayCard from './DisplayCard'
import Step from './Step'
import { Link } from '@reach/router'

import Number from './Number'
import { goodColor, badColor, wishColor, wishColorQuestion } from '../utils/colors'

const Content = styled.div`
  display: grid;
  grid-template-rows: auto;
  min-height: 100vh;
  overflow: visible;
  grid-gap: 1rem;
  justify-content: center;
  align-content: center;
  justify-items: center;
`

const Numbers = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 1rem;
`

const Wrapper = styled.div`
  max-width: 100vw;
`

const AllWrapper = styled.div`
  .logout {
    margin-top: 1rem;
    background: var(--bg-color);
  }
`

const { Provider, Consumer } = React.createContext()
class Main extends React.Component {
  state = {
    wishes: [],
    balance: null,
  }

  componentDidMount() {
    this.ref3 = base.syncState(`/app/${this.props.name}/wishes`, {
      context: this,
      state: 'wishes',
      asArray: true,
      then: () => console.log(this.state),
    })
    this.ref4 = base.syncState(`/app/${this.props.name}/balance`, {
      context: this,
      state: 'balance',
      asArray: false,
      then: () => console.log(this.state),
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref1)
    base.removeBinding(this.ref2)
    base.removeBinding(this.ref3)
  }

  setBalance = balance => {
    this.setState(prevState => ({ balance: [balance, ...prevState.balance] }))
  }
  removeWish = index => {
    const wishes = [...this.state.wishes]
    wishes.splice(index, 1)
    this.setState({ wishes })
  }

  setBad = bad => {
    this.setState({ bad: [bad, ...this.state.bad] })
  }

  setStepNumber = number => {
    this.setState({ step: number })
  }

  render() {
    const renderStep = number => {
      return (
        <Step
          text="Make some wishes that you want to happen at Slurp 🧚‍🌟"
          color={wishColorQuestion}
          textArray={this.state.wishes.map(wish => wish.wish)}
          addStuff={wish => {
            this.setState({ wishes: [{ wish: wish, isGreen: false }, ...this.state.wishes] })
          }}
          removeStuff={this.removeWish}
        />
      )
    }
    const { name, logout } = this.props
    const firstName = name.replace(/ .*/, '')
    return (
      <AllWrapper>
        <Wrapper>
          <Content>
            <h1>
              Sup {firstName}! <span>😎</span>
            </h1>
            <Link to="/dashboard">Go to dashboard!</Link>
            {renderStep(this.state.step)}
          </Content>
        </Wrapper>
        <button className="logout" onClick={this.props.logout}>
          Logout
        </button>
      </AllWrapper>
    )
  }
}

export default Main
