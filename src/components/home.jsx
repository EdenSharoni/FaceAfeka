import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Picture from "../components/profile/picture";
import TimeLine from "../components/profile/timeline";
import FindFriends from "./profile/find_friends";

class Home extends Component {
  render() {
    if (!sessionStorage.getItem("user")) {
      return <Redirect push to="./login" />;
    }
    return (
      <div id="home_page" className="page">
        <div>
          <Picture user_information={this.props.user_information} />
        </div>
        <div>
          <TimeLine title={""} user_information={this.props.user_information} />
        </div>
        <div>
          <FindFriends
            user_information={this.props.user_information}
            updateFriends={() => {}}
          />
        </div>
      </div>
    );
  }
}

export default Home;
