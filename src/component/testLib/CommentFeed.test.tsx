import '@testing-library/react/cleanup-after-each';
import React from 'react';
import { render } from '@testing-library/react';
import CommentFeed from './CommentFeed';

describe('CommentFeed', () => {
  it('renders the CommentFeed', () => {
    const { queryByText } = render(<CommentFeed header="Comment Feed" />);
    const header = queryByText('Comment Feed');
    expect(header.innerHTML).toBe('Comment Feed');
  });
});
