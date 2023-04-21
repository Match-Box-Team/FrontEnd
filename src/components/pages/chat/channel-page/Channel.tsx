import React, { useState } from 'react';
import Layout from '../../../commons/layout/Layout';
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';
import CreateRoom from '../chat-modal/createroom-modal/Createroom';

export default function Channel() {
  const [isOpenCreateRoomModal, setIsOpenCreateRoomModal] =
    useState<boolean>(false);
  const handleClickModal = () => {
    setIsOpenCreateRoomModal(!isOpenCreateRoomModal);
  };

  return (
    <Layout
      Header={<Header title="Channel" channelToggle toggleMove />}
      Footer={<Footer tab="channel" />}
    >
      <div>Channel</div>
      <CreateRoom
        isOpenCreateRoomModal={isOpenCreateRoomModal}
        handleClickModal={handleClickModal}
      />
    </Layout>
  );
}
