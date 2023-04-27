import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useAxiosWithToken } from '.';

// 예시
interface IFriend {
  friendId: string;
  buddyId: string;
  buddy: {
    nickname: string;
    intraId: string;
    status: string;
    image: string;
  };
}

export const useGetFriendList = () => {
  const axiosInstance = useAxiosWithToken();

  return useQuery<IFriend[], AxiosError>('friends', async () => {
    const response: AxiosResponse<IFriend[]> = await axiosInstance.get(
      '/friends',
    );
    return response.data;
  });
};
