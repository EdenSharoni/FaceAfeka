import React, { Component } from "react";
import { PostDataJSON } from "../../services/PostData";
import Picture from "./picture";
import TimeLine from "./timeline";
import About from "./profile_information/about";
import Friends from "./profile_information/friends";
import Photos from "./profile_information/photos";
import photos_img from "../../images/photos.png";
import friends_img from "../../images/friends.png";
import about_img from "../../images/about.jpg";
class OtherProfile extends Component {
  constructor(props) {
    super(props);
    let split = window.location.pathname.split("/");
    if (split[1] === "home" && split.length === 3) {
      let name = split[2];
      this.getUserInformation(name);
      this.state = {
        user: {
          userid: null,
          user_name: "",
          first_name: "",
          last_name: "",
          email: "",
          gender: "",
          picture: [],
        },
        status: "About",
        php_response: "",
      };
    }
  }

  render() {
    return this.state.user.userid ? (
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
          <Picture user_information={this.state.user} />
          <TimeLine title="Your TimeLine" user_information={this.state.user} />
        </div>
        <div className="profile_page_right">{this.getDiscription()}</div>
      </div>
    ) : (
      <div id="profile_page" className="page">
        <p id="php_response"> {this.state.php_response}</p>
      </div>
    );
  }

  getUserInformation(name) {
    let request = new FormData();
    request.append("name", name);
    PostDataJSON("getOtherUserInformation.php", request)
      .then((res) => this.setState({ user: res.user }))
      .catch((reject) => this.setState({ [reject.name]: [reject.message] }));
  }

  getDiscription = () => {
    switch (this.state.status) {
      case "About":
        return <About user_information={this.state.user} />;
      case "Friends":
        return <Friends user_information={this.state.user} search={false} />;
      case "Photos":
        return <Photos user_information={this.state.user} />;
      default:
        return <About user_information={this.state.user} />;
    }
  };
}

export default OtherProfile;
