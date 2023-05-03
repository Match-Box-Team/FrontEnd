import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { useAxiosWithToken } from '.';
import { IChatLog } from '../components/pages/chat/chatroom-page';

export const useGetChatRoomLog = (channelId: string) => {
  const axiosInstance = useAxiosWithToken();

  return useQuery(['chatRoomLog', channelId], async () => {
    const response: AxiosResponse<IChatLog> = await axiosInstance.get(
      `/channels/${channelId}`,
    );
    return response.data;
  });
};

export const useGetIsAdmin = (channelId: string) => {
  const axiosInstance = useAxiosWithToken();

  return useQuery(['getIsAdmin', channelId], async () => {
    const response: AxiosResponse<boolean> = await axiosInstance.get(
      `/channels/${channelId}/isAdmin`,
    );
    return response.data;
  });
};
