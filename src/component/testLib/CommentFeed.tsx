import React from 'react';
import { Component } from 'react';

export default class CommentFeed extends Component {
  public render() {
    const { header } = this.props;
    return (
      <div>
        <h2>{header}</h2>
      </div>
    );
  }
}
