import React, { useState } from 'react';
import Layout from '../../../commons/layout/Layout';
import Header from '../../../commons/header/Header';
import Footer from '../../../commons/footer/Footer';
import SetRoom from '../chat-modal/setroom-modal/SetRoom';
import Invite from '../chat-modal/invite-modal/Invite';

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

  return (
    <Layout
      Header={<Header title="Channel" channelBurger backPath="/chat/channel" />}
      Footer={<Footer tab="channel" />}
    >
      <div>ChatRoom</div>
      <SetRoom
        isOpenSetRoomModal={isOpenSetRoomModal}
        handleClickModal={handleClickSetRoomModal}
      />

      <Invite
        isOpenInviteModal={isOpenInviteModal}
        handleClickModal={handleClickSetInviteModal}
      />
    </Layout>
  );
}
