import React, { Component } from "react";
import { GetDataJSON } from "../../../services/GetPost";
import title from "../../../images/photos_title.png";
import pin_red_img from "../../../images/redPin.png";
import pin_blue_img from "../../../images/bluePin.png";
import pin_green_img from "../../../images/greenPin.png";
import pin_yellow_img from "../../../images/yellowPin.png";
const url = process.env.REACT_APP_SERVER;
const max = 40;
const min = -40;
let pinColor = pin_red_img;

class Photos extends Component {
  state = {
    photos: [],
  };
  constructor(props) {
    super(props);
    this.getPhotos();
  }
  render() {
    const imgThumbsPath =
      url +
      "face_afeka/faceAfeka/PostsImages/" +
      this.props.user_information.user_name +
      "/thumbs/";

    return (
      <div id="photos_page">
        <img src={title} alt="Not found" />
        {this.state.photos.map((value, index) => (
          <div
            key={index}
            style={{
              transform:
                "rotate(" +
                Math.floor(Math.random() * (max - min) + min) +
                "deg)",
            }}
          >
            {this.getPinColor()}
            <div id="pin">
              <img src={pinColor} alt="Not found" />
            </div>
            <img id="img" src={imgThumbsPath + value} alt="not found" />
          </div>
        ))}
      </div>
    );
  }

  getPinColor() {
    const key = Math.floor(Math.random() * Math.floor(4));
    switch (key) {
      case 0:
        pinColor = pin_red_img;
        break;
      case 1:
        pinColor = pin_blue_img;
        break;
      case 2:
        pinColor = pin_green_img;
        break;
      case 3:
        pinColor = pin_yellow_img;
        break;
      default:
        pinColor = pin_red_img;
        break;
    }
  }

  getPhotos() {
    let request = new FormData();
    request.append("user_id", this.props.user_information.userid);
    GetDataJSON("getPhotos.php", request)
      .then((response) => this.setState({ photos: response }))
      .catch((error) => console.log(error));
  }
}

export default Photos;
