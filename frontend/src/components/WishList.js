import React, { Component } from 'react'
import firebase from 'firebase'
import base from '../base'
import styled from 'styled-components'
import { colors } from '../utils/colors'
import AddTask from './AddTask'
import DisplayTask from './DisplayTask'
import DisplayWish from './DisplayWish'

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
  position: relative;
  overflow: visible;
  justify-content: center;
  align-content: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  h3 {
    color: orange;
  }
  .balance {
    span {
      font-weight: 700;
      color: rgba(0, 0, 0, 0.8);
    }
    color: orange;
    position: absolute;
    top: 20px;
    right: 40px;
  }
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
  h3 {
    color: white;
  }
`

const WishCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

class WishList extends Component {
  state = {
    parent: null,
    kid: null,
    balance: null,
    wishes: [],
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
    this.ref3 = base.syncState('app/kid/balance', {
      context: this,
      state: 'balance',
      asArray: false,
      then: () => console.log(this.state.balance),
    })
    this.ref4 = base.syncState('app/kid/wishes', {
      context: this,
      state: 'wishes',
      asArray: false,
      then: () => console.log(this.state.wishes),
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
    base.removeBinding(this.ref2)
    base.removeBinding(this.ref3)
    base.removeBinding(this.ref4)
  }

  setBalance = balance => {
    console.log('hehreasrsadfkj;, ', balance)

    const previousBalance = this.state.kid.balance

    this.setState(prevState => ({
      balance: parseInt(previousBalance || 0) + parseInt(balance),
    }))
  }

  handleCheckboxChange = index => {
    const newTasks = this.state.kid.tasks.map((task, i) => {
      if (i === index) {
        this.setBalance(task.price)
        task.completed = true
      }
      return task
    })
    this.setState({
      kid: {
        tasks: newTasks,
      },
    })
  }
  addTask = (description, price) => {
    const prevTasks = this.state.kid.tasks

    if (prevTasks) {
      this.setState({
        kid: {
          tasks: [...prevTasks, { description: description, price: price, completed: false, status: false }],
        },
      })
    } else {
      this.setState({
        kid: {
          tasks: [{ description: description, price: price, completed: false }],
        },
      })
    }
  }

  render() {
    const tasks = this.state.kid && this.state.kid.tasks
    return (
      <Content>
        <Wishes>
          <h3>Wishes</h3>
          <p className="balance">
            Jenny's balance: <span>{this.state.balance}€</span>
          </p>
          <WishCards>
            {this.state.wishes &&
              this.state.wishes.map((wish, index) => (
                <DisplayWish text={wish.wish} color={colors.orange} price={wish.price} />
              ))}
          </WishCards>
        </Wishes>
        <Tasks>
          <h3>Tasks</h3>
          <AddTask text="Add Task" color={colors.orange} handleAddTask={this.addTask} />
          {tasks &&
            tasks.map((task, index) => (
              <DisplayTask
                key={index}
                index={index}
                text={task.description}
                color={colors.orange}
                margin="10px"
                completed={task.completed}
                price={task.price}
                handleCheckboxChange={this.handleCheckboxChange}
              />
            ))}
        </Tasks>
      </Content>
    )
  }
}

export default WishList
