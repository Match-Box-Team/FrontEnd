import axios from 'axios';
import { useQuery } from 'react-query';
import { toBase64 } from './ProfileImge';

export interface UserChannel {
  isAdmin: boolean;
  user: {
    userId: string;
    nickname: string;
    image: string;
  };
  isFriend: boolean;
}

export interface ChatRoomListResponse {
  userChannel: UserChannel[];
}

export const getChatRoomInfo = async (
  channelId: string,
  token: string,
): Promise<ChatRoomListResponse> => {
  const response = await axios.get<ChatRoomListResponse>(
    `http://localhost:3000/channels/${channelId}/friends`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return response.data;
};

const getUserChannels = async (channelId: string, token: string) => {
  const res = await axios.get<ChatRoomListResponse>(
    `http://127.0.0.1:3000/channels/${channelId}/friends`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const results = res.data.userChannel;
  const updateResults = results.map(async item => {
    const imageUrl = await axios.get(
      `http://localhost:3000/account/image?userId=${item.user.userId}`,
      {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const updateItem = {
      ...item,
      user: {
        ...item.user,
        image: await toBase64(imageUrl.data),
      },
    };
    return updateItem;
  });
  return Promise.all(updateResults);
};

export const useUserChannels = (channelId: string, token: string) => {
  return useQuery(['userChannels', channelId, token], () =>
    getUserChannels(channelId, token),
  );
};
