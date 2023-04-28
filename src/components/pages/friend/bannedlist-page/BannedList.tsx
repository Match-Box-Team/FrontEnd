import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import Layout from '../../../commons/layout/Layout';
import Header from '../../../commons/header/Header';
import Footer from '../../../commons/footer/Footer';
import { userState } from '../../../../recoil/locals/login/atoms/atom';
import BanRestoreIcon from '../../../../assets/icon/ban-restore.svg';
import { getImageUrl } from '../../../../api/ProfileImge';

interface IBannedBuddy {
  nickname: string;
  image: string;
  status: string;
}

interface IBannedFriends {
  friendId: string;
  buddyId: string;
  buddy: IBannedBuddy;
}

export default function BannedList() {
  const [bannedFriends, setBannedFriends] = useState<IBannedFriends[]>([]);
  const [restoreClick, setRestoreClicked] = useState<boolean>(false);
  const userInfo = useRecoilValue(userState);

  const handleRestoreClicked = async (friendId: string) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/friends/${friendId}/banned`,
        {
          isBan: false,
        },
        config,
      );
      setRestoreClicked(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getIamgeUrls = async (friends: IBannedFriends[]) => {
    const urls = await Promise.all(
      friends.map(async friend => {
        const url = await getImageUrl(friend.buddyId, userInfo.token);
        return url;
      }),
    );
    return urls;
  };

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_BACKEND_URL}/friends/banned`,
          config,
        );
        const friends = response.data.friend;
        const imageUrls = await getIamgeUrls(friends);
        const updatedFriends = friends.map(
          (friend: IBannedFriends, index: number) => {
            return {
              ...friend,
              buddy: {
                ...friend.buddy,
                image: imageUrls[index],
              },
            };
          },
        );
        setBannedFriends(updatedFriends);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });

  const getImage = (buddyId: string) => {
    const fetchData = async () => {
      const imageUrl = await getImageUrl(buddyId, userInfo.token);
      return imageUrl;
    };
    return fetchData();
  };

  return (
    <Layout
      Header={<Header title="Banned" friendToggle toggleMove={false} />}
      Footer={<Footer tab="friend" />}
    >
      <Continer>
        <CountContainer>
          <Count>Banned {bannedFriends.length}</Count>
        </CountContainer>
        <ListContainer>
          {bannedFriends.map(bannedFriend => (
            <List key={bannedFriend.friendId}>
              <ProfileContiner>
                <ProfileImage>
                  <img
                    src={bannedFriend.buddy.image}
                    alt="검색된 유저 이미지"
                  />
                </ProfileImage>
              </ProfileContiner>
              <FriendContainer>
                <FriendNickname>{bannedFriend.buddy.nickname}</FriendNickname>
              </FriendContainer>
              <ButtonWrap>
                <RestoreButton
                  onClick={() => handleRestoreClicked(bannedFriend.friendId)}
                >
                  <RestoreImage src={BanRestoreIcon} />
                </RestoreButton>
              </ButtonWrap>
            </List>
          ))}
        </ListContainer>
      </Continer>
    </Layout>
  );
}

const Continer = styled.div`
  padding: 1.3rem 1.8rem 0rem;
`;

const CountContainer = styled.div`
  display: flex;
  justify-content: left;
`;

const Count = styled.span`
  font-weight: 400;
  font-size: 1.1rem;
  color: #2d3648;
`;

const ListContainer = styled.ul`
  display: flex;
  margin-top: 0;
  flex-direction: column;
  justify-content: left;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  gap: 0;
  height: inherit;
  overflow-y: auto;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1.9rem 0rem 0rem;
  width: 100%;
  height: 6rem;
  background-color: #ffffff;
`;

const ProfileContiner = styled.div`
  display: flex;
  justify-content: left;
`;

const ProfileImage = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FriendContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  padding: 0rem 2rem 0rem;
`;

const FriendNickname = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  color: #2d3648;
  text-decoration: none;
  color: inherit;
`;

const RestoreImage = styled.img`
  width: 5rem;
`;

const RestoreButton = styled.button`
  background: transparent;
  border: none;
  padding: 0rem 0rem 0rem;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
