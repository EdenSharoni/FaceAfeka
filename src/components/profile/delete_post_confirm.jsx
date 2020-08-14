import React, { Component } from "react";

class DeletePostConfirm extends Component {
  render() {
    return (
      <div id="delete_post_confirm">
        <hr />
        <input
          type="button"
          value="No"
          onClick={this.props.setPopupDeletePost}
        />
        <input type="button" value="Yes" onClick={this.props.deletePost} />
        <hr />
      </div>
    );
  }
}

export default DeletePostConfirm;
