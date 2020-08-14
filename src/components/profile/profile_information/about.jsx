import React, { Component } from "react";

class About extends Component {
  render() {
    const user = this.props.user_information;
    return (
      <div id="about_page">
        <p id="title">About</p>
        <p>
          Full Name: {user.first_name} {user.last_name}
        </p>
        <p>UserName: {user.user_name}</p>
        <p>Email: {user.email}</p>
        <p>Gender: {user.gender}</p>
      </div>
    );
  }
}

export default About;
