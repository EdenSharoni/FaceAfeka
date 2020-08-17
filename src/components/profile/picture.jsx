import React, { Component } from "react";
import unknown_person from "../../images/unknown_person.png";
let img;
const url = process.env.REACT_APP_SERVER;
class Picture extends Component {
  render() {
    const { user_information } = this.props;
    if (user_information.picture === null) img = unknown_person;
    else img = url + "face_afeka/" + user_information.picture[0];
    return (
      <div id="profile_picture">
        <img src={img} alt="not found" />
        <div className="light_background"></div>
        <p>{user_information.user_name}</p>
        <p>
          {user_information.first_name} {user_information.last_name}
        </p>
        <p>{user_information.email}</p>
      </div>
    );
  }
}

export default Picture;
