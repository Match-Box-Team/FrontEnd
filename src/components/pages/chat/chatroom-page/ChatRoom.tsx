import React, { useState } from 'react';
import Layout from '../../../commons/layout/Layout';
import Header from '../../../commons/header/Header';
import Footer from '../../../commons/footer/Footer';
import SetRoom from '../chat-modal/setroom-modal/SetRoom';

export default function ChatRoom() {
  const [isOpenSetRoomModal, setIsOpenSetRoomModal] = useState<boolean>(false);
  const handleClickModal = () => {
    setIsOpenSetRoomModal(!isOpenSetRoomModal);
  };

  return (
    <Layout
      Header={<Header title="Channel" channelBurger backPath="/chat/channel" />}
      Footer={<Footer tab="channel" />}
    >
      <div>ChatRoom</div>
      <SetRoom
        isOpenSetRoomModal={isOpenSetRoomModal}
        handleClickModal={handleClickModal}
      />
    </Layout>
  );
}
