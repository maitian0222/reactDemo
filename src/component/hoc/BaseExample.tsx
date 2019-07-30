import * as React from 'react';
import CommentList from './CommentList';
import BlogPost from './BlogPost';

export default function BaseExample() {
  return (
    <>
      <CommentList />
      <BlogPost value={3} />
    </>
  );
}
