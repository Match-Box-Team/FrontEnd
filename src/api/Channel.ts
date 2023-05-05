import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { useAxiosWithToken } from '.';
import {
  IChatLog,
  IIsAdminAndIsMute,
} from '../components/pages/chat/chatroom-page';

export const useGetChatRoomLog = (channelId: string) => {
  const axiosInstance = useAxiosWithToken();

  return useQuery(['chatRoomLog', channelId], async () => {
    const response: AxiosResponse<IChatLog> = await axiosInstance.get(
      `/channels/${channelId}`,
    );
    return response.data;
  });
};

export const useUserChannel = (
  userId: string,
  channelId: string | undefined,
) => {
  const axiosInstance = useAxiosWithToken();

  return useQuery(['getIsAdmin', userId, channelId], async () => {
    if (channelId === undefined) {
      return null;
    }
    const response: AxiosResponse<IIsAdminAndIsMute> = await axiosInstance.get(
      `/channels/${channelId}/member/${userId}`,
    );
    return response.data;
  });
};
