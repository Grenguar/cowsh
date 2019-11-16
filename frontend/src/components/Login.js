import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <>
        <h3>Login with Google</h3>
        <button onClick={this.props.authenticate}>Login</button>
      </>
    )
  }
}

export default Login
