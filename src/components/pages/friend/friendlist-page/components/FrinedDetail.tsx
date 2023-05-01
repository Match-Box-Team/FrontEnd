import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userState } from '../../../../../recoil/locals/login/atoms/atom';
import FriendDetailList from './FriendDetailList';
import { useGetFriendList } from '../../../../../api/Friends';
import { getImageUrl } from '../../../../../api/ProfileImge';

const Base = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;
  border-top: 1px solid #d3d3d3;
`;

const FriendCount = styled.span`
  display: flex;
  justify-content: start;
  font-size: 1.1rem;
  margin-top: 1.3rem;
  margin-left: 1.8rem;
`;

const FriendWrapper = styled.div`
  margin-top: 1.9rem;
  margin-left: 1.8rem;
  display: flex;
  flex-direction: column;
`;

const Friend = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0 0 0;
  width: 100%;
  > li + li {
    margin-top: 2.5rem;
  }
`;

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
export default function FriendDetail() {
  const userInfo = useRecoilValue(userState);
  const { data: friendListsData, isLoading, isError } = useGetFriendList();
  const [buddies, setBuddies] = useState<Array<IBuddy>>([]);
  const [friendCount, setFriendCount] = useState<number>(0);

  /*
// inChat false
// muteKick null
// ban banProps에 맞게
 */

  useEffect(() => {
    if (friendListsData && friendListsData.friends) {
      const updatedFriendLists = async () => {
        const newFriendLists = await Promise.all(
          friendListsData.friends.map(async (data: IFriends) => {
            const imageUrl = await getImageUrl(data.buddyId, userInfo.token);
            return {
              ...data.buddy,
              image: imageUrl,
            };
          }),
        );
        setBuddies(newFriendLists);
        setFriendCount(friendListsData.friends.length);
      };
      updatedFriendLists();
    }
  }, [friendListsData]);

  return (
    <Base>
      <FriendCount>Friends {friendCount}</FriendCount>
      <FriendWrapper>
        <Friend>
          {buddies.map((data: IBuddy) => (
            <FriendDetailList
              key={data.intraId}
              imageUrl={data.image}
              nickName={data.nickname}
              status={data.status}
            />
          ))}
        </Friend>
      </FriendWrapper>
    </Base>
  );
}
