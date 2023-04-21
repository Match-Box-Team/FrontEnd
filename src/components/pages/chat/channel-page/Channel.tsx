import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { RecoilRoot, useRecoilState } from 'recoil';
import Layout from '../../../commons/layout/Layout';
<<<<<<< HEAD
import ChannelList from './sub-components/ChannelList';
import { isModalOpenState } from '../../../../recoil/locals/chat/atoms/atom';
import CreateChannelModal from './sub-components/CreateChannel';

const BG = styled.div`
  display: flex-start;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  padding: 3rem 0;
  position: relative;
`;

const AddChannelButton = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background-color: #3ab5c5;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #ffffff;
`;
=======
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';
>>>>>>> develop

export default function Channel() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <BG>
        <h1>Channels</h1>
        <ChannelList />
        <AddChannelButton onClick={openModal}>+</AddChannelButton>
        <CreateChannelModal onRequestClose={closeModal} />
      </BG>
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
