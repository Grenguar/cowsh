import React from 'react';
import styled from 'styled-components';
const Card = styled.div`
  display: inline-block;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 20px;
  background: white;
  color: ${props => props.color};
  border-radius: 15px;
  max-width: 80%;
  margin: ${props => props.margin};

  p {
    padding: 10px;
    margin: 0;
  }
`;

class DisplayCard extends React.Component {
  handleRemove = () => {
    this.props.removeStuff(this.props.index);
  };
  render() {
    return (
      <Card color={this.props.color} onClick={this.handleRemove} margin={this.props.margin || 0}>
        <p>{this.props.text}</p>
      </Card>
    );
  }
}

export default DisplayCard;
