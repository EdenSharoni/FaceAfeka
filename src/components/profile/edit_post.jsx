import React, { Component } from "react";

class EditPostSave extends Component {
  render() {
    return (
      <div id="edit_post_confirm">
        <hr />
        <input
          type="button"
          value="Discard"
          onClick={this.props.cancelChanges}
        />
        <input type="button" value="Save" onClick={this.props.updatePost} />
        <hr />
      </div>
    );
  }
}

export default EditPostSave;
