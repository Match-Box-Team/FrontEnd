import axios from 'axios';

interface UserChannel {
  isAdmin: boolean;
  user: {
    userId: string;
    nickname: string;
    image: string;
  };
  isFriend: boolean;
}

interface ChatRoomListResponse {
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
