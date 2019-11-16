import React from 'react'
import firebase from 'firebase'
import base from '../base'
import styled from 'styled-components'
import AddCard from './AddCard'
import DisplayCard from './DisplayCard'
import Step from './Step'
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
    good: [],
    bad: [],
    wishes: [],
    step: 1,
  }

  componentDidMount() {
    this.ref1 = base.syncState(`/app/${this.props.name}/good`, {
      context: this,
      state: 'good',
      asArray: true,
      then: () => console.log(this.state),
    })
    this.ref2 = base.syncState(`/app/${this.props.name}/bad`, {
      context: this,
      state: 'bad',
      asArray: true,
      then: () => console.log(this.state),
    })
    this.ref3 = base.syncState(`/app/${this.props.name}/wishes`, {
      context: this,
      state: 'wishes',
      asArray: true,
      then: () => console.log(this.state),
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref1)
    base.removeBinding(this.ref2)
    base.removeBinding(this.ref3)
  }

  setGood = good => {
    this.setState(prevState => ({ good: [good, ...prevState.good] }))
  }
  removeGood = index => {
    const good = [...this.state.good]
    good.splice(index, 1)
    this.setState({ good })
  }
  removeBad = index => {
    const bad = [...this.state.bad]
    bad.splice(index, 1)
    this.setState({ bad })
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
      if (number === '1')
        return (
          <Step
            text="What are the things you are proud of in the past few weeks which you want to share with everyone? 🤩"
            color={goodColor}
            textArray={this.state.good}
            addStuff={this.setGood}
            removeStuff={this.removeGood}
          />
        )
      if (number === '2')
        return (
          <Step
            text="Is there something holding you back from doing your best work? Is there anything that should be improved?💪"
            color={badColor}
            textArray={this.state.bad}
            addStuff={this.setBad}
            removeStuff={this.removeBad}
          />
        )
      if (number === '3')
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
      return (
        <Step
          text="What are the things you are proud of in the past few weeks which you want to share with everyone? 🤩"
          color={goodColor}
          textArray={this.state.good}
          addStuff={this.setGood}
          removeStuff={this.removeGood}
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
            <Numbers>
              <Number number="1" color={goodColor} setIsGoodOpen={this.setStepNumber} />
              <Number number="2" color={badColor} setIsGoodOpen={this.setStepNumber} />
              <Number number="3" color={wishColorQuestion} setIsGoodOpen={this.setStepNumber} />
            </Numbers>
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
