import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useAxiosWithToken } from '.';

interface IBuddy {
  nickname: string;
  intraId: string;
  status: string;
  image: string;
}

interface IFriends {
  friendId: string;
  buddyId: string;
  buddy: IBuddy;
}

interface IFriend {
  friends: IFriends[];
}

export const useGetFriendList = () => {
  const axiosInstance = useAxiosWithToken();

  return useQuery<IFriend, AxiosError>('friends', async () => {
    const response: AxiosResponse<IFriend> = await axiosInstance.get(
      '/friends',
    );
    return response.data;
  });
};
