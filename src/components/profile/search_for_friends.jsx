import React, { Component } from "react";

class SearchForFriends extends Component {
  render() {
    return (
      <input
        id="search_for_friends"
        type="text"
        placeholder="Search for friends"
        onChange={this.props.function()}
      />
    );
  }
}

export default SearchForFriends;
