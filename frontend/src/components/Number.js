import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  background: ${props => props.color};
  p {
    margin: 0;
    padding: 2px;
  }
`;

class Number extends React.Component {
  render() {
    return (
      <Content color={this.props.color} onClick={() => this.props.setIsGoodOpen(this.props.number)}>
        <p>{this.props.number}</p>
      </Content>
    );
  }
}

export default Number;
