import React from 'react'
import styled from 'styled-components'
import AddCard from './AddCard'

const Content = styled.div`
  display: grid;
  grid-gap: 1rem;

  justify-items: center;
`

class Step extends React.Component {
  render() {
    return (
      <Content>
        <AddCard text={this.props.text} color={this.props.color} addStuff={this.props.addStuff} />
      </Content>
    )
  }
}

export default Step
