import React, { Component } from "react";
import Picture from "./picture";
import TimeLine from "./timeline";
import { Redirect } from "react-router-dom";
import About from "./profile_information/about";
import Friends from "./profile_information/friends";
import Photos from "./profile_information/photos";
import photos_img from "../../images/photos.png";
import friends_img from "../../images/friends.png";
import about_img from "../../images/about.jpg";
import EditProfile from "./profile_information/edit_profile";

class Profile extends Component {
  state = {
    status: "About",
  };
  render() {
    if (!sessionStorage.getItem("user")) {
      return <Redirect push to="./login" />;
    }
    return (
      <div id="profile_page" className="page">
        <div className="profile_page_left">
          <table>
            <tbody>
              <tr>
                <td onClick={() => this.setState({ status: "Photos" })}>
                  <img src={photos_img} alt="not found" />
                </td>
              </tr>
              <tr>
                <td onClick={() => this.setState({ status: "Friends" })}>
                  <img src={friends_img} alt="not found" />
                </td>
              </tr>
              <tr>
                <td onClick={() => this.setState({ status: "About" })}>
                  <img src={about_img} alt="not found" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="profile_page_center">
          <Picture user_information={this.props.user_information} />
          <TimeLine
            title="Your TimeLine"
            user_information={this.props.user_information}
          />
        </div>
        <div className="profile_page_right">{this.getDiscription()}</div>
      </div>
    );
  }

  getDiscription = () => {
    switch (this.state.status) {
      case "Friends":
        return (
          <Friends
            user_information={this.props.user_information}
            search={true}
          />
        );
      case "Photos":
        return <Photos user_information={this.props.user_information} />;
      default:
        return (
          <div>
            <About user_information={this.props.user_information} />
            <EditProfile
              user_information={this.props.user_information}
              updateUser={this.props.updateUser}
            />
          </div>
        );
    }
  };
}

export default Profile;
