import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PostData } from "../services/PostData";

let user;

class NavBar extends Component {
  constructor(props) {
    super(props);
    user = sessionStorage.getItem("user");
  }
  render() {
    return (
      <div id="navbarDiv">
        <p style={{ display: user ? "inline" : "none" }}> {this.userName()}</p>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/games">Games</Link>
        <div id="user" style={{ display: user ? "inline" : "none" }}>
          {this.logout()}
          {this.delete()}
        </div>
      </div>
    );
  }
  logout() {
    return (
      <button
        style={{ fontSize: "15px", display: "inline", marginRight: "10px" }}
        onClick={this.logoutUser}
      >
        Logout
      </button>
    );
  }
  delete() {
    return (
      <button
        style={{ fontSize: "15px", display: "inline" }}
        onClick={this.deleteUser}
      >
        Delete User
      </button>
    );
  }
  userName() {
    return "Hello " + this.props.user_information.user_name + " !  ";
  }

  deleteUser = () => {
    let request = new FormData();
    request.append("user_id", this.props.user_information.userid);
    PostData("deleteUser.php", request)
      .then(this.logoutUser())
      .catch((error) => console.log(error));
  };

  logoutUser = () => {
    sessionStorage.getItem("user", "");
    sessionStorage.clear();
    this.props.setUserAuthentication(false);
    window.location = "/login";
  };
}

export default NavBar;
