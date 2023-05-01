import axios from 'axios';
import { useMutation } from 'react-query';
import { queryClient } from '../App';

// react-query 친구 추가
export const useAddFriendMutation = (
  channelId: string,
  initailToken: string,
) => {
  return useMutation<void, Error, { userId: string; token: string }>(
    ({ userId, token }) =>
      axios.post(
        'http://localhost:3000/friends',
        {
          userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          'userChannels',
          channelId,
          initailToken,
        ]);
      },
    },
  );
};
