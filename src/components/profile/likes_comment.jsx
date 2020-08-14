import React, { Component } from "react";
import { PostDataJSON } from "../../services/PostData";
import { PostData } from "../../services/PostData";
import unknown_person from "../../images/unknown_person.png";
import url_like_on from "../../sound/like_on.wav";
import url_like_off from "../../sound/like_off.wav";
import Comment from "./comment";
import { GetDataJSON } from "../../services/GetPost";

let img;
class LikesComments extends Component {
  state = {
    show_comments: false,
    play_like_sound: false,
    comment_description: "",
    comments: [],
  };
  render() {
    if (this.props.user_information.picture === null) img = unknown_person;
    else
      img =
        "http://localhost/face_afeka/" + this.props.user_information.picture[1];
    return (
      <div id="likes_comments">
        <form method="post" onSubmit={this.PostCommentToDB}>
          <p id="likes">{this.props.post["likes_num"]} Likes</p>
          <p id="comments">{this.props.post["comments_num"]} Comments</p>
          <hr />
          <input
            style={
              this.props.post["liked_post"]
                ? { color: "blue" }
                : { color: "black" }
            }
            type="button"
            value="Like"
            id={this.props.post["post_id"]}
            onClick={this.like_btn}
          />
          <input
            type="button"
            value="Comment"
            onClick={() => this.GetCommentsFromDB()}
          />
          <hr />

          <div
            id="user_comment"
            style={
              this.state.show_comments ? { display: "" } : { display: "none" }
            }
          >
            {this.state.comments.map((value, index) => (
              <Comment key={index} comment={value} />
            ))}
            <div>
              <img src={img} alt="not found" />
              <input
                type="text"
                value={this.state.comment_description}
                id={this.props.post["post_id"] + "text"}
                placeholder="Write a comment..."
                onChange={(e) =>
                  this.setState({ comment_description: e.target.value })
                }
              />
              <input type="submit" value="Post" />
            </div>
          </div>
        </form>
      </div>
    );
  }

  PostCommentToDB = (e) => {
    e.preventDefault();
    let request = new FormData();
    request.append("user_id", this.props.user_information.userid);
    request.append("post_id", this.props.post["post_id"]);
    request.append("description", this.state.comment_description);
    PostDataJSON("insertComment.php", request)
      .then(() => {
        this.setState({ comment_description: "" });
        document.getElementById(this.props.post["post_id"] + "text").value = "";
        GetDataJSON("getComment.php", request)
          .then((res) => {
            const comments = this.state.comments;
            comments.splice(comments.length, 0, res);
            this.setState({ comments });
            const post = this.props.post;
            post["comments_num"]++;
            this.props.updateTimelinePosts(post, "update");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  GetCommentsFromDB() {
    if (this.state.show_comments) {
      this.setState({ show_comments: false });
      return;
    }
    this.setState({ show_comments: true });
    let request = new FormData();
    request.append("post_id", this.props.post["post_id"]);
    GetDataJSON("getComments.php", request)
      .then((res) => {
        this.setState({ comments: res });
      })
      .catch((error) => console.log(error));
  }

  audio_like_on = new Audio(url_like_on);
  audio_like_off = new Audio(url_like_off);

  like_btn = (e) => {
    e.preventDefault();
    let request = new FormData();
    request.append("user_id", this.props.user_information.userid);
    request.append("post_id", this.props.post["post_id"]);
    request.append("likes", this.props.post["likes_num"]);

    PostData("insertLike.php", request)
      .then(() => {
        const post = this.props.post;
        if (post["liked_post"] === 0) {
          document.getElementById(this.props.post["post_id"]).className =
            "like_animation";
          this.audio_like_on.play();
          post["liked_post"] = 1;
          post["likes_num"]++;
        } else {
          document.getElementById(this.props.post["post_id"]).className =
            "dislike_animation";
          this.audio_like_off.play();
          post["liked_post"] = 0;
          post["likes_num"]--;
        }
        this.props.updateTimelinePosts(post, "update");
      })
      .catch((error) => console.log(error));
  };
}

export default LikesComments;
