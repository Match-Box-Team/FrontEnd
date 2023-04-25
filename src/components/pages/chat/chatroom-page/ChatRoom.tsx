import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Layout from '../../../commons/layout/Layout';
import Header from '../../../commons/header/Header';
import Footer from '../../../commons/footer/Footer';
import SetRoom from '../chat-modal/setroom-modal/SetRoom';
import Invite from '../chat-modal/invite-modal/Invite';
import Profile from '../../../commons/modals/profile-modal/Profile';

interface Member {
  userId: string;
  intraId: string;
  nickname: string;
  image: string;
  muteKick: MuteKickProps;
}

interface MuteKickProps {
  isAdmin: boolean;
  isMute: boolean;
}

// 채팅방 멤버 state 초기값
const initialMember: Member = {
  userId: '',
  intraId: '',
  nickname: '',
  image: '',
  muteKick: {
    isAdmin: false,
    isMute: false,
  },
};

export default function ChatRoom() {
  // 채팅방 설정 모달
  const [isOpenSetRoomModal, setIsOpenSetRoomModal] = useState<boolean>(false);
  const handleClickSetRoomModal = () => {
    setIsOpenSetRoomModal(!isOpenSetRoomModal);
  };

  // 친구 초대 모달
  const [isOpenInviteModal, setIsOpenInviteModal] = useState<boolean>(false);
  const handleClickSetInviteModal = () => {
    setIsOpenInviteModal(!isOpenInviteModal);
  };

  // 친구 프로필 모달 예시
  const member: Member = {
    userId: '0d6d117f-4d0f-4579-b0da-1ce51c1e41b8',
    intraId: 'chaekim',
    nickname: '김채린',
    image: '',
    muteKick: {
      isAdmin: true,
      isMute: true,
    },
  };
  const [isOpenProfileModal, setIsOpenProfileModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<Member>(initialMember);
  const handleClickSetUser = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    console.log(member);
    const imageUrl = await axios.get(
      `http://localhost:3000/account/image?userId=${member.userId}`,
      {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
      },
    );
    console.log(imageUrl);
    member.image = URL.createObjectURL(imageUrl.data);
    setSelectedUser(member);
    setIsOpenProfileModal(true);
  };
  const handleClickSetProfileModal = async () => {
    setIsOpenProfileModal(false);
  };

  return (
    <>
      <Layout
        Header={
          <Header title="Channel" channelBurger backPath="/chat/channel" />
        }
        Footer={<Footer tab="channel" />}
      >
        <SetRoom
          isOpenSetRoomModal={isOpenSetRoomModal}
          handleClickModal={handleClickSetRoomModal}
        />
        <Invite
          isOpenInviteModal={isOpenInviteModal}
          handleClickModal={handleClickSetInviteModal}
        />
        <OpenButton onClick={handleClickSetUser}>프로필 모달 생성</OpenButton>
      </Layout>
      {isOpenProfileModal && selectedUser && (
        <Profile
          handleClickModal={handleClickSetProfileModal}
          user={selectedUser}
          inChat
        />
      )}
    </>
  );
}

export const OpenButton = styled.strong`
  position: absolute;
  top: 6rem;
  right: 0.3rem;
  font-size: 2.5rem;
  color: #c2c2c2;
  cursor: pointer;
  font-weight: bold;
  margin: 1rem;
`;
