import * as React from 'react';
import useFriendStatus from './useFriendStatus';
import Friend from '../types/Friend';

/**
 * 使用自定义hook useFriendStatus
 */
export default function FriendStatus(props: { friend: Friend }) {
  const isOnline = useFriendStatus(props.friend.id);
  return isOnline ? 'onLine' : 'offLine';
}
