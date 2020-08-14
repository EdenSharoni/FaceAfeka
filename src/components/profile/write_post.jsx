import React, { Component } from "react";
import { PostDataJSON } from "../../services/PostData";
import { GetDataJSON } from "../../services/GetPost";

class WritePost extends Component {
  state = {
    text: "",
    php_response: "",
    private_public: 0, //0 - Public , 1 - Private
    textFocus: false,
  };
  render() {
    return (
      <div id="write_post">
        <form method="post" id="add_post" onSubmit={this.InsertPostToDB}>
          <p id="empty_text">{this.state.php_response}</p>
          <input
            type="text"
            name="description"
            autoComplete="off"
            placeholder="What's on your mind?"
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
            onFocus={() => {
              if (!this.state.textFocus) {
                this.setState({ textFocus: true });
                document.getElementById("post_animation").className =
                  "write_post_animation";
                document.getElementById("post_animation").id =
                  "write_post_animation";
              }
            }}
          />
          <input type="submit" value="Post" />
          <div id="post_animation">
            <input type="file" id="img" multiple />
            <input
              type="checkbox"
              id="private"
              value="private"
              checked={this.state.private_public === 1}
              onChange={this.handlePrivatePublicChange}
            />
            <label>Private</label>
            <input
              type="checkbox"
              id="public"
              value="public"
              checked={this.state.private_public === 0}
              onChange={this.handlePrivatePublicChange}
            />
            <label>Public</label>
          </div>
        </form>
      </div>
    );
  }

  handlePrivatePublicChange = (changeEvent) =>
    this.setState({
      private_public: changeEvent.target.value === "private" ? 1 : 0,
    });

  InsertPostToDB = (e) => {
    this.setState({ php_response: "" });
    e.preventDefault();
    let request = new FormData();
    request.append("user_name", this.props.user_information.user_name);
    request.append("user_id", this.props.user_information.userid);
    request.append("description", this.state.text);
    request.append("radio", this.state.private_public);
    for (const file of document.getElementById("img").files)
      request.append("myFiles[]", file);

    PostDataJSON("insertPost.php", request)
      .then((res) => {
        this.setState({ text: "", php_response: "", textFocus: false });
        document.getElementsByName("description").value = "";
        document.getElementById("img").value = null;
        document.getElementById("write_post_animation").id = "post_animation";
        GetDataJSON("getPost.php", request)
          .then((res) => this.props.updateTimelinePosts(res, "add"))
          .catch((error) => console.log(error));
      })
      .catch((reject) => this.setState({ [reject.name]: [reject.message] }));
  };
}

export default WritePost;
