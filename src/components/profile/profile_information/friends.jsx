import React, { Component } from "react";
import { GetDataJSON } from "../../../services/GetPost";
import FindFriends from "../find_friends";

class Friends extends Component {
  state = {
    friends: [],
  };
  constructor(props) {
    super(props);
    this.getFriends();
  }
  render() {
    return (
      <div id="friends_page">
        <p id="title">Friends</p>
        <ol>
          {this.state.friends.map((value, index) => (
            <li key={index}>{value["name"]}</li>
          ))}
        </ol>
        {this.props.search ? (
          <FindFriends
            className="home_find_friends"
            updateFriends={this.updateFriends}
            user_information={this.props.user_information}
          />
        ) : (
          ""
        )}
      </div>
    );
  }

  getFriends() {
    let request = new FormData();
    request.append("user_id", this.props.user_information.userid);
    request.append("input", "*");
    GetDataJSON("current_friends.php", request)
      .then((response) => this.setState({ friends: response }))
      .catch((error) => console.log(error));
  }

  updateFriends = (friend, status) => {
    const friends = this.state.friends;
    const indexfriend = friends.findIndex((x) => x.name === friend.name);
    switch (status) {
      case "delete":
        friends.splice(indexfriend, 1);
        break;
      case "add":
        friends.splice(friends.length, 0, friend);
        break;
      default:
        break;
    }
    this.setState({ friends });
  };
}

export default Friends;
