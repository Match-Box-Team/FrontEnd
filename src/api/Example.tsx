import { useQuery } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { getFriendList } from './Friends';

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

// 코드 복붙해서 테스트해보세요
// 코드를 테스트하기 전에 api폴더에 index.ts에 토큰을 넣어야 합니다
// 그래야 서버 401 안 뜹니다
export default function Example() {
  const { isLoading, isError, data } = useQuery<IFriend[], AxiosError>(
    'friends',
    () =>
      getFriendList().then(
        (response: AxiosResponse<IFriend[]>) => response.data,
      ),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data. </div>;
  }

  console.log(data);

  return <div>브라우저를 켜서 콘솔에서 데이터가 제대로 오는 지 확인하세요</div>;
}
