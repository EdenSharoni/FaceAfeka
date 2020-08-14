import React from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Login from "./components/login";
import Home from "./components/home";
import Games from "./components/games";
import Profile from "./components/profile/profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OtherProfile from "./components/profile/other_profile";
import { GetDataJSON } from "./services/GetPost";
import { PostDataJSON } from "./services/PostData";
import { PostData } from "./services/PostData";

class App extends React.Component {
  constructor() {
    super();
    this.checkForFriendRequest();
  }
  state = {
    userAuthentication: false,
    user_information: JSON.parse(sessionStorage.getItem("user")) || {
      userid: null,
      user_name: "",
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      picture: [],
    },
  };

  render() {
    PostData("face_afeka_connect.php");
    return (
      <Router>
        <NavBar
          user_information={this.state.user_information}
          setUserAuthentication={this.setUserAuthentication}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home user_information={this.state.user_information} />
            )}
          />
          <Route path="/home/:username" render={(props) => <OtherProfile />} />
          <Route
            path="/home"
            render={(props) => (
              <Home user_information={this.state.user_information} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <Login
                setUserAuthentication={this.setUserAuthentication}
                userAuthentication={this.state.userAuthentication}
                updateUser={this.updateUser}
              />
            )}
          />
          <Route
            path="/profile"
            render={(props) => (
              <Profile
                user_information={this.state.user_information}
                updateUser={this.updateUser}
              />
            )}
          />
          <Route
            path="/games"
            render={(props) => (
              <Games user_information={this.state.user_information} />
            )}
          />
        </Switch>
      </Router>
    );
  }

  updateUser = (user) => {
    this.setState({ user_information: user });
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  setUserAuthentication = (state) =>
    this.setState({ userAuthentication: state });

  checkForFriendRequest = () => {
    let request = new FormData();
    request.append("user_id", this.state.user_information.userid);
    GetDataJSON("friend_requests.php", request)
      .then((res) => {
        res.forEach((value, index) => {
          if (window.confirm(value["name"] + " sent you a friend request"))
            this.addFriend(value, index);
        });
      })
      .catch((error) => console.log(error));
  };

  addFriend = (friend, index) => {
    let request = new FormData();
    request.append("followed_user", friend["friendid"]);
    request.append("following_user", this.state.user_information.userid);
    PostDataJSON("add_friend.php", request);
  };
}

export default App;
