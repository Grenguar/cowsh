import React, { Component } from 'react'
import base from '../base'
import styled from 'styled-components'
import { goodColor, badColor } from '../utils/colors'
import GodDisplayCard from './GodDisplayCard'

const Cards = styled.div`
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Content = styled.div`
  padding: 1rem;
  .title {
    color: rgb(80, 80, 80);
    font-weight: lighter;
  }
`

class GodMode extends Component {
  state = {
    firebase: {},
  }

  componentDidMount() {
    this.ref = base.bindToState('app', {
      context: this,
      state: 'firebase',
      asArray: false,
      then: () => console.log(this.state.firebase),
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  render() {
    const goods = Object.keys(this.state.firebase)
      .map(person => this.state.firebase[person].good)
      .filter(el => el != null)
    console.log('Goods', goods)

    const bads = Object.keys(this.state.firebase)
      .map(person => this.state.firebase[person].bad)
      .filter(el => el != null)
    const good = [].concat(...goods)
    const bad = [].concat(...bads)

    return (
      <Content>
        <h4 className="title">You are in God mode now 😇 Discuss how the red text bubbles can be solved.</h4>

        <Cards>
          {bad.map(text => (
            <GodDisplayCard text={text} color={badColor} margin="10px" />
          ))}
        </Cards>
        <Cards>
          {good.map(text => (
            <GodDisplayCard text={text} color={goodColor} margin="10px" />
          ))}
        </Cards>
      </Content>
    )
  }
}

export default GodMode
