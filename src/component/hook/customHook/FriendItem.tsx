import * as React from 'react';
import useFriendStatus from './useFriendStatus';
import Friend from '../types/Friend';
/**
 * 使用自定义hook useFriendStatus
 */
export default function FriendItem(props: { friend: Friend }) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? '#52c41a' : '#d9d9d9' }}>
      {props.friend.name}
    </li>
  );
}
