import React, { Component } from "react";
import { GetDataJSON } from "../../services/GetPost";
import { PostDataJSON } from "../../services/PostData";
import UserTemplate from "./user_template";
import SearchForFriends from "./search_for_friends";

const current_user = JSON.parse(sessionStorage.getItem("user"));

class FindFriends extends Component {
  state = {
    hint: [],
  };
  render() {
    return (
      <div id="find_friends_page">
        <SearchForFriends function={() => this.getMatch} />
        {this.state.hint.map((value, index) => (
          <UserTemplate
            key={index}
            value={value}
            index={index}
            btnText={value["are_friends"]}
            function={() => this.addFriend(value, index)}
            display={current_user.userid === this.props.user_information.userid}
          />
        ))}
      </div>
    );
  }

  addFriend = (friend, index) => {
    let request = new FormData();
    request.append("followed_user", friend["friendid"]);
    request.append("following_user", this.props.user_information.userid);
    PostDataJSON("add_friend.php", request)
      .then((res) => {
        const hint = this.state.hint;
        if (hint[index]["are_friends"] === "Confirm") {
          hint[index]["are_friends"] = res.text;
          this.props.updateFriends(friend, "add");
        } else if (hint[index]["are_friends"] === "Unfollow") {
          hint[index]["are_friends"] = res.text;
          this.props.updateFriends(friend, "delete");
        } else hint[index]["are_friends"] = res.text;
        this.setState({ hint });
      })
      .catch((error) => console.log(error));
  };

  getMatch = (e) => {
    let request = new FormData();
    let input = e.target.value;
    request.append("input", input);
    request.append("user_id", this.props.user_information.userid);
    if (input === "*") {
      GetDataJSON("current_friends.php", request)
        .then((res) => this.setState({ hint: res }))
        .catch((error) => console.log(error));
    } else {
      GetDataJSON("find_friend_match.php", request)
        .then((res) => this.setState({ hint: res }))
        .catch((error) => console.log(error));
    }
  };
}

export default FindFriends;
