import React, { Component } from "react";
import unknown_person from "../../images/unknown_person.png";
import { Link } from "react-router-dom";
let img;
const url = process.env.REACT_APP_SERVER;
class UserTemplate extends Component {
  render() {
    const { value, index, btnText } = this.props;
    if (value["picture"] === null) img = unknown_person;
    else img = url + "face_afeka/" + value["picture"];
    return (
      <div id="friend">
        <img src={img} alt="not found" />
        <Link
          style={{
            margin: "auto",
            display: "inline-block",
            fontSize: "15px",
            marginLeft: "15px",
          }}
          className="post_name"
          to={"/home/" + value["name"]}
        >
          {value["name"]}
        </Link>
        <input
          style={{ display: this.props.display ? "inline" : "none" }}
          type="button"
          value={btnText}
          onClick={() => this.props.function(value, index)}
        />
      </div>
    );
  }
}

export default UserTemplate;
