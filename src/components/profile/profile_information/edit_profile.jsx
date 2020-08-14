import React, { Component } from "react";
import { PostDataJSON } from "../../../services/PostData";
const female = "Female";
const male = "Male";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
  }

  initState = () => ({
    edit_status: "first_name",
    field_text: "",
    new_password_text_field: "",
    php_response: "",
    file: null,
  });

  render() {
    return (
      <form method="POST" id="edit_profile" onSubmit={this.update_user}>
        <fieldset>
          <legend>Edit your profile</legend>
          <div>
            <p id="php_response">{this.state.php_response}</p>
            <select
              value={this.state.edit_status}
              onChange={(event) =>
                this.setState({
                  edit_status: event.target.value,
                  field_text: "",
                  new_password_text_field: "",
                  php_response: "",
                })
              }
            >
              <option value="first_name">First Name</option>
              <option value="last_name">Last Name</option>
              <option value="gender">Gender</option>
              <option value="picture">Profile Picture</option>
              <option value="password">Password</option>
            </select>

            <p style={this.passwordUpdate()}>Current password</p>
            {this.getTextOrRadio()}
            <input
              style={{
                display:
                  this.state.edit_status === "picture" ? "block" : "none",
              }}
              id="file"
              type="file"
              multiple={false}
              onChange={this.handelFile}
            />
            <div style={this.passwordUpdate()}>
              <p>New password</p>
              <input
                type="password"
                value={this.state.new_password_text_field}
                onChange={(e) =>
                  this.setState({ new_password_text_field: e.target.value })
                }
              />
            </div>
            <input type="submit" value="Edit" />
          </div>
        </fieldset>
      </form>
    );
  }

  passwordUpdate = () => {
    return this.state.edit_status === "password"
      ? { display: "block" }
      : { display: "none" };
  };

  getTextOrRadio() {
    if (this.state.edit_status === "gender")
      return (
        <div className="edit_radio">
          <input
            type="radio"
            value={female}
            checked={this.state.field_text === female}
            onChange={this.handleGenderChange}
          />
          {female}
          <input
            type="radio"
            value={male}
            checked={this.state.field_text === male}
            onChange={this.handleGenderChange}
          />
          {male}
        </div>
      );
    else if (this.state.edit_status !== "picture")
      return (
        <input
          type={this.state.edit_status === "password" ? "password" : "text"}
          name={this.state.edit_status}
          value={this.state.field_text}
          onChange={(e) => this.setState({ field_text: e.target.value })}
        />
      );
  }
  handelFile = (e) => this.setState({ file: e.target.files[0] });
  handleGenderChange = (changeEvent) =>
    this.setState({
      field_text: changeEvent.target.value,
    });

  update_user = (e) => {
    e.preventDefault();
    if (
      this.state.edit_status !== "picture" &&
      this.state.field_text.trim() === ""
    ) {
      this.setState({ php_response: "Please fill all fields" });
      return;
    }
    this.setState({ php_response: "" });
    const user = this.props.user_information;
    user[this.state.edit_status] = this.state.field_text;
    let request = new FormData();
    request.append("user", JSON.stringify(user));
    request.append("file", this.state.file);
    request.append("current_password", this.state.field_text);
    request.append("new_password", this.state.new_password_text_field);
    if (this.state.edit_status === "password")
      request.append("password_change", 1);
    else request.append("password_change", 0);
    PostDataJSON("updateUser.php", request)
      .then((res) => {
        document.getElementById("file").value = "";
        this.setState(this.initState());
        this.props.updateUser(res.user);
      })
      .catch((reject) => {
        this.setState({ [reject.name]: [reject.message] });
      });
  };
}

export default EditProfile;
