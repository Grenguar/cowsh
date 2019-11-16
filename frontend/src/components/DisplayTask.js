import React from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'
const Card = styled.div`
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 20px;
  background: white;
  padding: 5px 15px;
  color: ${props => props.color};
  border-radius: 15px;
  margin: ${props => props.margin};
  .price {
    font-weight: 700;
  }
  p {
    padding: 10px;
    margin: 0;
  }
`

class DisplayTask extends React.Component {
  state = {
    checked: false,
  }
  render() {
    return (
      <Card
        color={this.props.color}
        onClick={() => this.props.handleCheckboxChange(this.props.index)}
        margin={this.props.margin || 0}
      >
        <Checkbox checked={this.props.completed} onChange={this.handleCheckboxChange} />
        <p>{this.props.text}</p>
        <p className="price">{this.props.price}€</p>
      </Card>
    )
  }
}

export default DisplayTask
