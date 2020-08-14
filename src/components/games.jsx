import React, { Component } from "react";
import { GetDataJSON } from "../services/GetPost";
import { Redirect } from "react-router-dom";
import { PostDataJSON } from "../services/PostData";
import UserTemplate from "./profile/user_template";
import SearchForFriends from "./profile/search_for_friends";
let player1 = "";

class Games extends Component {
  constructor(props) {
    super(props);
    player1 = this.props.user_information.user_name;
    this.GetRequest();
  }
  state = {
    hint: [],
    request: [],
    php_response: "",
  };
  render() {
    if (!sessionStorage.getItem("user")) return <Redirect push to="./login" />;

    return (
      <div
        id="game_page"
        className="page"
        style={
          this.state.request !== null
            ? { display: "grid", gridTemplateColumns: "1fr 1fr" }
            : {}
        }
      >
        {this.state.request !== null ? (
          <div id="requests">
            {this.state.request["name"]} Wants to play with you
            <UserTemplate
              value={this.state.request}
              index={0}
              btnText="Play"
              function={() => this.play(this.state.request["name"])}
              display={true}
            />
          </div>
        ) : (
          <div id="requests"></div>
        )}

        <div>
          <p id="php_response" style={{ display: "inlineBlock" }}>
            {this.state.php_response}
          </p>
          Search for other opponents
          <SearchForFriends function={() => this.GetMatch} />
          {this.state.hint.map((value, index) => (
            <UserTemplate
              key={index}
              value={value}
              index={index}
              btnText="Play"
              function={() => this.play(value["name"])}
              display={true}
            />
          ))}
        </div>
      </div>
    );
  }

  play(player2) {
    let request = new FormData();
    request.append("player1", player1);
    request.append("player2", player2);

    PostDataJSON("gameRequest.php", request)
      .then((res) => {
        console.log(res.game);
        if (player2 !== "") {
          const player1 = res.game["player1"];
          const player2 = res.game["player2"];
          const room = res.game["room"];
          const data = { player1, player2, room };
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };
          fetch("http://localhost:8080/", options)
            .then(() => {
              window.location =
                "http://localhost:8080/?player1=" +
                player1 +
                "&player2=" +
                player2;
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((reject) => {
        console.log(reject.name);
        this.setState({ [reject.name]: [reject.message] });
      });
  }

  GetMatch = (e) => {
    let request = new FormData();
    request.append("input", e.target.value);
    request.append("user_id", this.props.user_information.userid);
    GetDataJSON("current_friends.php", request)
      .then((res) => this.setState({ hint: res }))
      .catch((error) => console.log(error));
  };

  GetRequest() {
    let request = new FormData();
    request.append("user_name", this.props.user_information.user_name);
    GetDataJSON("getGameRequests.php", request)
      .then((res) => this.setState({ request: res }))
      .catch((reject) => console.log(reject));
  }
}

export default Games;
