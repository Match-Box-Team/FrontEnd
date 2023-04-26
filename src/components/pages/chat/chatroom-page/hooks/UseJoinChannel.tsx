import { useMutation } from 'react-query';
import { joinChannel } from '../../../../../api/Channel';

export const useJoinChannel = (id: string | undefined) => {
  const joinChannelMutation = useMutation(async () => {
    if (id === undefined) {
      throw new Error('Error joining channel');
    }

    const response = joinChannel(id);

    //   if (!response.ok) {
    //       throw new Error('Error joining channel');
    //     }
    console.log(response);

    return response;
  });

  return joinChannelMutation;
};
