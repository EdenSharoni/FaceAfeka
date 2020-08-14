import React, { Component } from "react";
class SignIn extends Component {
  render() {
    return (
      <form
        method="POST"
        id={this.props.signIn}
        onSubmit={this.props.checkAuthUser}
      >
        <label id="php_response">{this.props.php_response}</label>
        <p id="title">{this.props.signIn}</p>
        <label>UserID</label>
        <input
          type="text"
          name="user_name"
          onChange={this.props.handleChange}
        />
        <label>Password</label>
        <input
          type="Password"
          name="password"
          onChange={this.props.handleChange}
        />
        <input type="submit" value={this.props.selectedOption} />
        <p className="moveBetweenForms">Dont have a user - </p>
        <input
          className="moveBetweenForms"
          type="reset"
          value={this.props.signUp}
          onClick={() => this.props.reset(this.props.signUp)}
        />
      </form>
    );
  }
}

export default SignIn;
