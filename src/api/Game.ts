import { UseQueryOptions, useQueries, useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useAxiosWithToken } from '.';
import { IGameInfo, IGameWatch } from '../components/pages/game/watchgame-page';

export const useGetGameWatchList = (
  gameId: string | undefined,
  onError: () => void,
) => {
  const axiosInstance = useAxiosWithToken();

  const queryOptions: UseQueryOptions<IGameWatch, AxiosError> = {
    queryFn: async () => {
      const response: AxiosResponse<IGameWatch> = await axiosInstance.get(
        `/games/${gameId}`,
      );
      return response.data;
    },
    onError: () => onError(),
    retry: 0, // 바로 실패로 처리하려면 시도 횟수를 0으로 설정
  };

  return useQuery<IGameWatch, AxiosError>('GameWatchList', queryOptions);
};

export const useGetGameList = () => {
  const axiosInstance = useAxiosWithToken();

  return useQuery('GameList', async () => {
    const response: AxiosResponse<IGameInfo[]> = await axiosInstance.get(
      `/games/`,
    );
    return response.data;
  });
};
