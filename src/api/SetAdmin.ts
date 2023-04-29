import { useMutation } from 'react-query';
import axios from 'axios';
import { queryClient } from '../App';

export const useSetAdminMutation = (
  initailChannelId: string,
  initailToken: string,
) => {
  return useMutation<
    void,
    Error,
    { channelId: string; userId: string; token: string }
  >(
    ({ channelId, userId, token }) =>
      axios.patch(
        `http://localhost:3000/channels/${channelId}/member/${userId}/admin`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          'userChannels',
          initailChannelId,
          initailToken,
        ]);
      },
    },
  );
};
