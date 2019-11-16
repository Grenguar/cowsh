import React from 'react'
import styled from 'styled-components'
import AddCard from './AddCard'
import DisplayCard from './DisplayCard'

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
        {this.props.textArray.map((text, index) => (
          <DisplayCard
            key={text}
            index={index}
            text={text}
            color={this.props.color}
            removeStuff={this.props.removeStuff}
          />
        ))}
      </Content>
    )
  }
}

export default Step
