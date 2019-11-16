import React from 'react'
import base from '../base'
import styled from 'styled-components'
import Step from './Step'
import { Link } from '@reach/router'
import { wishColorQuestion } from '../utils/colors'

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

const Wrapper = styled.div`
  max-width: 100vw;
`

const AllWrapper = styled.div`
  .logout {
    margin-top: 1rem;
    background: var(--bg-color);
  }
`

class Main extends React.Component {
  state = {
    wishes: [],
    balance: null,
  }

  componentDidMount() {
    this.ref3 = base.syncState(`/app/kid/wishes`, {
      context: this,
      state: 'wishes',
      asArray: true,
      then: () => console.log(this.state),
    })
    this.ref4 = base.syncState(`/app/kid/balance`, {
      context: this,
      state: 'balance',
      asArray: false,
      then: () => console.log(this.state),
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref4)
    base.removeBinding(this.ref3)
  }
  removeWish = index => {
    const wishes = [...this.state.wishes]
    wishes.splice(index, 1)
    this.setState({ wishes })
  }

  render() {
    const renderStep = number => {
      return (
        <Step
          text="Make some wishes that you want to happen at WishVault 🧚‍🌟"
          color={wishColorQuestion}
          textArray={this.state.wishes.map(wish => wish.wish)}
          addStuff={wish => {
            this.setState({ wishes: [{ wish, ...this.state.wishes }] })
          }}
          removeStuff={this.removeWish}
        />
      )
    }
    return (
      <AllWrapper>
        <Wrapper>
          <Content>
            <h1>Add wish</h1>
            <Link to="/dashboard">Go to dashboard!</Link>
            {renderStep(this.state.step)}
          </Content>
        </Wrapper>
      </AllWrapper>
    )
  }
}

export default Main
