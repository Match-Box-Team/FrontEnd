import React, { useState } from 'react';
import Layout from '../../../commons/layout/Layout';
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';
import CreateRoom from '../chat-modal/createroom-modal/Createroom';

export default function Channel() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleClickModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <Layout>
      <CreateRoom
        isOpenModal={isOpenModal}
        handleClickModal={handleClickModal}
      />
    </Layout>
  );
}

/*
    Header와 Footer를 넣었을 떄
    return (
    <Layout
      Header={<Header title="Channel" channelToggle toggleMove />}
      Footer={<Footer tab="channel" />}
    >
      <div>Channel</div>
    </Layout>
  );
*/
