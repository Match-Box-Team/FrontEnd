import axios from 'axios';
import { useMutation } from 'react-query';
import { queryClient } from '../App';

// react-query 게임 구매
export const useBuyGameMutation = (initailToken: string) => {
  return useMutation<void, Error, { gameId: string; token: string }>(
    ({ gameId, token }) =>
      axios.post(`http://localhost:3000/games/${gameId}/buy`, null, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['games', initailToken]);
      },
    },
  );
};
