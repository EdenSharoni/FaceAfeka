import React, { Component } from "react";
class SignUp extends Component {
  state = {};
  render() {
    return (
      <form
        id={this.props.signUp}
        method="POST"
        onSubmit={this.props.checkAuthUser}
      >
        <label id="php_response">{this.props.php_response}</label>
        <p id="title">{this.props.signUp}</p>
        <label>UserID</label>
        <input
          type="text"
          name="user_name"
          onChange={this.props.handleChange}
        />
        <br></br>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            onChange={this.props.handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            onChange={this.props.handleChange}
          />
        </div>
        <label>Email</label>
        <input type="text" name="email" onChange={this.props.handleChange} />
        <br></br>
        <input
          type="radio"
          value={this.props.female}
          name="gender"
          checked={this.props.user["gender"] === this.props.female}
          onChange={this.props.handleChange}
        />
        {this.props.female}
        <input
          type="radio"
          value={this.props.male}
          name="gender"
          checked={this.props.user["gender"] === this.props.male}
          onChange={this.props.handleChange}
        />
        {this.props.male}
        <br></br>
        <input type="file" multiple={false} onChange={this.props.handelFile} />
        <br></br>
        <div>
          <label>Password</label>
          <input
            type="Password"
            name="password"
            onChange={this.props.handleChange}
          />
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type="Password"
            name="rpassword"
            onChange={this.props.handleChange}
          />
        </div>
        <input type="submit" value={this.props.selectedOption} />
        <p className="moveBetweenForms">Go back - </p>
        <input
          className="moveBetweenForms"
          type="reset"
          value={this.props.signIn}
          onClick={() => this.props.reset(this.props.signIn)}
        />
      </form>
    );
  }
}

export default SignUp;
