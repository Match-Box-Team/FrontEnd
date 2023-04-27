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
