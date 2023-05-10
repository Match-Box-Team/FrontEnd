import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useAxiosWithToken } from '.';
import {
  IChatLog,
  IIsAdminAndIsMute,
} from '../components/pages/chat/chatroom-page';

interface IChannel {
  channelId: string;
  channelName: string;
  count: number;
  password: string | null;
}

interface IChannelWrapper {
  channel: IChannel[];
}

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
    if (channelId === undefined || userId === '') {
      return null;
    }
    const response: AxiosResponse<IIsAdminAndIsMute> = await axiosInstance.get(
      `/channels/${channelId}/member/${userId}`,
    );
    return response.data;
  });
};

export const useGetChannels = (onError: (error: AxiosError) => void) => {
  const axiosInstance = useAxiosWithToken();

  const queryOptions: UseQueryOptions<IChannelWrapper, AxiosError> = {
    queryFn: async () => {
      const response: AxiosResponse<IChannelWrapper> = await axiosInstance.get(
        `/channels`,
      );
      return response.data;
    },
    onError: error => onError(error),
    retry: 0,
  };

  return useQuery<IChannelWrapper, AxiosError>(['getChannels'], queryOptions);
};
