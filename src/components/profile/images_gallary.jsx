import React, { Component } from "react";
import arrow from "../../images/arrow.png";
import exit from "../../images/exit.png";
class ImagesGallary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePointer: 0,
      length: this.props.imageGallary.filter((value) => value !== "").length,
    };
  }
  render() {
    const { SetOpenImageGallary, path, imageGallary } = this.props;
    return (
      <div id="image">
        <img
          id="exit"
          src={exit}
          alt="not found"
          onClick={() => SetOpenImageGallary()}
        />
        <img
          style={{ display: this.state.length > 1 ? "block" : "none" }}
          id="arrow_right"
          src={arrow}
          alt="not found"
          onClick={this.swipe}
        />
        <img
          id="picture"
          src={path + imageGallary[this.state.imagePointer]}
          alt="not found"
        />
        <img
          id="arrow_left"
          src={arrow}
          alt="not found"
          onClick={this.swipe}
          style={{ display: this.state.length > 1 ? "block" : "none" }}
        />
      </div>
    );
  }
  swipe = (e) => {
    let imagePointer = this.state.imagePointer;
    let length = this.state.length - 1;
    e.target.id === "arrow_right"
      ? imagePointer === length
        ? (imagePointer = 0)
        : imagePointer++
      : imagePointer === 0
      ? (imagePointer = length)
      : imagePointer--;

    this.setState({ imagePointer });
  };
}

export default ImagesGallary;
