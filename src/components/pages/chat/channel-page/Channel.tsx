import React, { useState } from 'react';
import Layout from '../../../commons/layout/Layout';
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
    <Layout Header={<Header/> Footer={<Footer>}}>
    {Contents}
    </Layout>);
  */
