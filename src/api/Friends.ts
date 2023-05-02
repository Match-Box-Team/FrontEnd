import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useAxiosWithToken } from '.';
import { IFriend } from '../components/pages/friend/friendlist-page';

export const useGetFriendList = () => {
  const axiosInstance = useAxiosWithToken();

  return useQuery<IFriend, AxiosError>('friends', async () => {
    const response: AxiosResponse<IFriend> = await axiosInstance.get(
      '/friends',
    );
    return response.data;
  });
};
