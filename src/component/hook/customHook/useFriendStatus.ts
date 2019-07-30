import * as React from 'react';
import { useState, useEffect } from 'react';
const onLineFriendList = [
  {
    id: '1',
    name: 'Phoebe',
  },
  {
    id: '2',
    name: 'Rachel',
  },
];
const ChatAPI = {
  subscribeToFriendStatus: (
    friendId: string,
    func: (status: { isOnline: boolean }) => void,
  ) => {
    const friend = onLineFriendList.find((item) => item.id === friendId);
    if (friend) {
      func({
        isOnline: true,
      });
    } else {
      func({
        isOnline: false,
      });
    }
  },
  unsubscribeFromFriendStatus: (
    friendId: string,
    func: (status: { isOnline: boolean }) => void,
  ) => {
    // alert('取消订阅');
  },
};

/**
 *
 * 提取自定义 Hook  自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。
 */
export default function useFriendStatus(friendId: string) {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    function handleStatusChange(status: { isOnline: boolean }) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendId, handleStatusChange);
    };
  });

  return isOnline;
}
