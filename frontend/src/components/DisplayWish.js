import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  max-width: 500px;
  width: 300px;
  min-height: 200px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 20px 40px;
  border-radius: 15px;
  overflow: hidden;
  background: ${props => props.color};
  margin: 1rem;
  margin-bottom: 30px;
  input {
    color: ${props => props.color};
    max-width: 50px;
    border: none;
    border-radius: 5px;
  }
  p {
    font-weight: 700;
    padding: 20px;
    margin: 0;
    color: white;
  }
`

const TextAndPrice = styled.div`
  display: grid;
  grid-template-rows: 1fr 50px;
  border-radius: 15px;
  .price {
    color: white;
    font-weight: 700;
    font-size: 64px;
  }

  button {
    border-radius: 0px;
    padding: 10px;
    background: white;
    color: orange;
    span {
      font-weight: 700;
    }
  }
`

class DisplayWish extends React.Component {
  render() {
    return (
      <Content color={this.props.color}>
        <p>{this.props.text}</p>
        <TextAndPrice color={this.props.color}>
          <div className="price">€{this.props.price}</div>
          {this.props.balance >= this.props.price ? (
            <button
              onClick={() => {
                this.props.handlePay(this.props.text, this.props.price, this.props.index)
              }}
            >
              <span>Pay</span>
            </button>
          ) : (
            undefined
          )}
        </TextAndPrice>
      </Content>
    )
  }
}

export default DisplayWish
