import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  max-width: 500px;
  width: 80%;
  min-height: 200px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 20px 40px;
  border-radius: 15px;
  overflow: hidden;
  background: white;
  margin: auto;

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
    border-radius: 0px;
    background: ${props => props.color};
  }

  input,
  textarea {
    background: white;
    color: ${props => props.color};
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

class AddCard extends React.Component {
  textRef = React.createRef()

  handleClick = () => {
    let text = this.textRef.current.value
    text && this.props.addStuff(text)
    this.textRef.current.value = ''
  }

  render() {
    return (
      <Content color={this.props.color}>
        <p>{this.props.text}</p>
        <InputWithButton color={this.props.color}>
          <textarea ref={this.textRef} placeholder="Type here anything" />
          <button onClick={this.handleClick}>Add</button>
        </InputWithButton>
      </Content>
    )
  }
}

export default AddCard
