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
  background: white;
  margin: auto;
  margin-bottom: 30px;
  input {
    color: ${props => props.color};
    max-width: 50px;
    border: none;
    border-radius: 5px;
  }
  p {
    padding: 20px;
    margin: 0;
    color: ${props => props.color};
  }
`

const InputWithButton = styled.div`
  display: grid;
  grid-template-rows: 1fr 40px;
  border-radius: 15px;
  overflow: hidden;

  background: white;
  button {
    font-weight: 700;
    border-radius: 0px;
    padding: 10px;
    background: ${props => props.color};
  }

  input,
  textarea {
    background: white;
    border-radius: 0;
    display: block;
    text-align: center;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  textarea {
    resize: none;
    border: none;
    text-align: left;
    display: inline-block;
    width: 100%;
    margin: auto;
    font-weight: lighter;
    border-radius: 5px;
    text-align: center;
  }
`

class AddTask extends React.Component {
  descriptionRef = React.createRef()
  priceRef = React.createRef()

  handleClick = () => {
    let description = this.descriptionRef.current.value
    let price = this.priceRef.current.value
    description && this.props.handleAddTask(description, price)
    this.descriptionRef.current.value = ''
    this.priceRef.current.value = ''
  }

  render() {
    return (
      <Content color={this.props.color}>
        <p>{this.props.text}</p>
        <InputWithButton color={this.props.color}>
          <textarea ref={this.descriptionRef} placeholder="Some descripiton" />
          <textarea ref={this.priceRef} placeholder="How much will you pay?" />
          <button onClick={this.handleClick}>Add</button>
        </InputWithButton>
      </Content>
    )
  }
}

export default AddTask
