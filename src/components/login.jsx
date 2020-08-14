import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { PostDataJSON } from "../services/PostData";
import SignIn from "./signIn";
import SignUp from "./signUp";

const signIn = "SignIn";
const signUp = "SignUp";
const female = "Female";
const male = "Male";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(signIn);
  }

  render() {
    if (this.props.userAuthentication) return <Redirect push to="./" />;
    if (sessionStorage.getItem("user")) return <Redirect push to="./" />;

    return (
      <div className="loginDiv pageLogin">
        {this.state.selectedOption === signIn ? (
          <SignIn
            checkAuthUser={this.checkAuthUser}
            signIn={signIn}
            signUp={signUp}
            php_response={this.state.php_response}
            handleChange={this.handleChange}
            selectedOption={this.state.selectedOption}
            reset={this.reset}
          />
        ) : (
          <SignUp
            checkAuthUser={this.checkAuthUser}
            signIn={signIn}
            signUp={signUp}
            male={male}
            female={female}
            php_response={this.state.php_response}
            handleChange={this.handleChange}
            handelFile={this.handelFile}
            selectedOption={this.state.selectedOption}
            reset={this.reset}
            user={this.state.user}
          />
        )}
      </div>
    );
  }

  getInitialState = (status) => ({
    user: {
      user_name: "",
      first_name: "",
      last_name: "",
      email: "",
      gender: female,
      password: "",
      rpassword: "",
    },
    selectedOption: status,
    php_response: "",
    file: null,
    picture_note: 0,
  });

  reset = (state) => this.setState(this.getInitialState(state));
  handelFile = (e) => this.setState({ file: e.target.files[0] });

  handleChange = (e) => {
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  checkAuthUser = (e) => {
    e.preventDefault();
    let request = new FormData();
    request.append("user", JSON.stringify(this.state.user));
    request.append("option", this.state.selectedOption);
    request.append("file", this.state.file);
    request.append("profile_respose_once", this.state.picture_note);
    PostDataJSON("authUser.php", request)
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.user));
        this.props.setUserAuthentication(true);
        this.props.updateUser(res.user);
        window.location.reload();
      })
      .catch((reject) => {
        if (reject.message === "You can pick a profile picture")
          this.setState({ picture_note: 1 });
        this.setState({ [reject.name]: [reject.message] });
      });
  };
}

export default Login;
