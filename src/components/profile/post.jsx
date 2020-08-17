import React, { Component } from "react";
import unknown_person from "../../images/unknown_person.png";
import LikesComments from "./likes_comment";
import DeletePostConfirm from "./delete_post_confirm";
import { PostData } from "../../services/PostData";
import ImagesGallary from "./images_gallary";
import EditPostSave from "./edit_post";
import { Link } from "react-router-dom";
const current_user = JSON.parse(sessionStorage.getItem("user")) || {
  userid: null,
  user_name: "",
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  picture: [],
};
const url = process.env.REACT_APP_SERVER;
const basicImagesPath = url + "face_afeka/faceAfeka/PostsImages/";
let img;
class ProfilePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete_post: false,
      openMenu: false,
      images: [],
      close_menu_on_blur: true,
      openImageGallary: false,
      editPost: false,
      post_id: this.props.post["post_id"],
      edit_description: this.props.post["description"],
      edit_private: this.props.post["private"],
    };
  }

  componentDidUpdate() {
    if (this.state.post_id !== this.props.post["post_id"]) {
      this.setState({
        delete_post: false,
        openMenu: false,
        images: [],
        close_menu_on_blur: true,
        openImageGallary: false,
        editPost: false,
        post_id: this.props.post["post_id"],
        edit_description: this.props.post["description"],
        edit_private: this.props.post["private"],
      });
    }
  }

  render() {
    const { post, updateTimelinePosts, user_information } = this.props;
    if (post["picture"] === null) img = unknown_person;
    else img = url + "face_afeka/" + post["picture"];
    return (
      <div id="profile_post">
        {this.state.openImageGallary ? (
          <div id="images_gallary">
            <ImagesGallary
              SetOpenImageGallary={() =>
                this.setState({ openImageGallary: false })
              }
              path={basicImagesPath + post["post_username"] + "/img/"}
              imageGallary={post["images"]}
            />
          </div>
        ) : null}

        <div className="title">
          <img src={img} alt="not found" />
          <Link
            style={{
              display: "inline-block",
              fontSize: "15px",
              textDecoration: "none",
              color: "black",
            }}
            className="post_name"
            to={"/home/" + post["post_username"]}
          >
            {post["post_username"]}
          </Link>

          <p className="post_date">{post["date"]}</p>

          <div className="post_private" style={this.checkVisibility()}>
            {this.state.editPost ? (
              <select
                onChange={(event) =>
                  this.setState({ edit_private: parseInt(event.target.value) })
                }
                defaultValue={post["private"] ? 1 : 0}
              >
                <option value={1}>Private</option>
                <option value={0}>Public</option>
              </select>
            ) : (
              <p>{post["private"] === 0 ? "~Public~" : "~Private~"}</p>
            )}
          </div>

          <button
            style={this.checkVisibility()}
            className="dots"
            onClick={() => this.setState({ openMenu: !this.state.openMenu })}
          >
            &#xFE19;
          </button>
          <div
            id="profile_menu"
            style={
              this.state.openMenu
                ? { visibility: "visible" }
                : { visibility: "hidden" }
            }
          >
            <input
              type="button"
              onClick={() =>
                this.setState({
                  delete_post: true,
                  openMenu: false,
                  editPost: false,
                })
              }
              value="Delete"
            />
            <hr></hr>
            <input
              type="button"
              onClick={() =>
                this.setState({
                  delete_post: false,
                  editPost: true,
                  openMenu: false,
                })
              }
              value="Edit"
            />
          </div>
        </div>

        <div className="content">
          {this.state.delete_post ? (
            <p className="delete_post">Delete Post?</p>
          ) : (
            this.getContext()
          )}
        </div>

        {this.state.delete_post ? (
          <DeletePostConfirm
            setPopupDeletePost={() =>
              this.setState({ delete_post: false, editPost: false })
            }
            post_id={post["post_id"]}
            deletePost={this.deletePost}
          />
        ) : this.state.editPost ? (
          <EditPostSave
            updatePost={this.updatePost}
            cancelChanges={this.cancelChanges}
          />
        ) : (
          <LikesComments
            post={post}
            updateTimelinePosts={updateTimelinePosts}
            user_information={user_information}
          />
        )}
      </div>
    );
  }

  checkVisibility() {
    if (this.props.post["post_user_id"] === current_user.userid)
      return { display: "" };
    else return { display: "none" };
  }

  getContext = () => {
    const imgThumbsPath =
      basicImagesPath + this.props.post["post_username"] + "/thumbs/";
    return (
      <div className="post_context">
        {this.state.editPost ? (
          <textarea
            type="text"
            id={"description" + this.props.post["post_id"]}
            value={this.state.edit_description}
            onChange={this.handleDescriptionChange}
          />
        ) : (
          <p>{this.props.post["description"]}</p>
        )}
        <br></br>
        {this.props.post["images"]
          .filter((value) => value !== "")
          .map((value, index) => (
            <img
              key={index}
              src={imgThumbsPath + value}
              alt="not found"
              onClick={() => this.SetOpenImageGallary(true)}
            />
          ))}
      </div>
    );
  };

  handleDescriptionChange = (e) =>
    this.setState({ edit_description: e.target.value });

  deletePost = () => {
    const post_id = this.props.post["post_id"];
    let request = new FormData();
    request.append("post_id", post_id);
    PostData("deletePost.php", request)
      .then((res) => {
        this.setState({ delete_post: false, editPost: false });
        this.props.updateTimelinePosts(this.props.post, "delete");
      })
      .catch((error) => console.log(error));
  };

  updatePost = () => {
    if (
      this.state.edit_description.trim() === "" &&
      this.props.post["images"].length === 0
    ) {
      this.setState({
        editPost: false,
        deletePost: false,
        edit_description: this.props.post["description"],
      });
      document.getElementById(
        "description" + this.props.post["post_id"]
      ).value = this.props.post["description"];
      return;
    }
    this.props.post["description"] = this.state.edit_description;
    this.props.post["private"] = this.state.edit_private;
    let request = new FormData();
    request.append("post", JSON.stringify(this.props.post));
    PostData("updatePost.php", request)
      .then((res) => {
        this.props.updateTimelinePosts(this.props.post, "update");
        this.setState({ editPost: false, deletePost: false });
      })
      .catch((error) => console.log("error"));
  };

  cancelChanges = () => {
    document.getElementById(
      "description" + this.props.post["post_id"]
    ).value = this.props.post["description"];
    this.setState({
      editPost: false,
      deletePost: false,
      edit_description: this.props.post["description"],
    });
  };

  SetOpenImageGallary = (state) => this.setState({ openImageGallary: state });
}

export default ProfilePost;
