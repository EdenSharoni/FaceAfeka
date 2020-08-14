import React, { Component } from "react";
import unknown_person from "../../images/unknown_person.png";
let img;
class Comment extends Component {
  render() {
    const { comment } = this.props;
    if (comment["userImg"] === null) img = unknown_person;
    else img = "http://localhost/face_afeka/" + comment["userImg"];
    return (
      <div id="comment">
        <img
          id="picture"
          src={img}
          alt="not found"
          onError={() => {
            document.getElementById("picture").src = unknown_person;
          }}
        />
        <div id="context">
          <p id="name">{comment["name"]}</p>
          <p>{comment["date"]}</p>
          <p id="description">{comment["description"]}</p>
        </div>
      </div>
    );
  }
}

export default Comment;
