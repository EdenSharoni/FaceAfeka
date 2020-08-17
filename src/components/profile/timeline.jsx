import React, { Component } from "react";
import Post from "./post";
import { GetDataJSON } from "../../services/GetPost";
import WritePost from "./write_post";

const current_user = JSON.parse(sessionStorage.getItem("user")) || {
  userid: null,
  user_name: "",
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  picture: [],
};
class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.InitPosts();
  }

  state = {
    posts: [],
    modalOpen: false,
  };

  render() {
    return (
      <div id="timeline_page">
        {this.props.user_information.userid === current_user.userid ? (
          <div>
            <p>{this.props.title}</p>
            <WritePost
              user_information={this.props.user_information}
              updateTimelinePosts={this.updateTimelinePosts}
            />
          </div>
        ) : (
          ""
        )}
        {this.state.posts
          .filter((value) =>
            this.props.title === ""
              ? value["private"] === 0 ||
                value["post_user_id"] === this.props.user_information.userid
              : this.props.user_information.userid === current_user.userid
              ? value["post_user_id"] === this.props.user_information.userid
              : value["private"] === 0 &&
                value["post_user_id"] === this.props.user_information.userid
          )
          .map((value, index) => (
            <Post
              key={index}
              post={value}
              updateTimelinePosts={this.updateTimelinePosts}
              user_information={this.props.user_information}
            />
          ))}
      </div>
    );
  }

  InitPosts() {
    let request = new FormData();
    request.append("user_id", this.props.user_information.userid);
    GetDataJSON("getPosts.php", request)
      .then((res) => {
        const posts = [];
        for (var i = 0; i < res.length; i++) posts.push(res[i]);
        this.setState({ posts });
      })
      .catch((error) => {
        console.log("No posts: " + error);
      });
  }

  updateTimelinePosts = (post, status) => {
    const posts = [...this.state.posts];
    const indexpost = posts.findIndex((x) => x === post);
    switch (status) {
      case "delete":
        posts.splice(indexpost, 1);
        break;
      case "add":
        posts.splice(0, 0, post);
        break;
      case "update":
        posts.splice(indexpost, 1, post);
        break;
      default:
        break;
    }
    this.setState({ posts });
  };
}

export default TimeLine;
