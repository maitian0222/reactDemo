import * as React from 'react';
import { useState } from 'react';
import { Badge } from 'antd';
import useFriendStatus from './useFriendStatus';
import FriendItem from './FriendItem';
const friendList = [
  { id: '1', name: 'Phoebe' },
  { id: '2', name: 'Rachel' },
  { id: '3', name: 'Ross' },
];

/**
 * 在多个 hook之间传递信息
 */
export default function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState('1');
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Badge status={isRecipientOnline ? 'success' : 'default'} />
      <select
        value={recipientID}
        onChange={(e) => setRecipientID(e.target.value)}
      >
        {friendList.map((friend) => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
      <div>
        <FriendList />
      </div>
    </>
  );
}

function FriendList() {
  return (
    <ul>
      {friendList.map((item) => (
        <FriendItem friend={item} key={item.id} />
      ))}
    </ul>
  );
}
