import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useRecoilState } from 'recoil';
import Layout from '../../../commons/layout/Layout';
import ChannelList from './sub-components/ChannelList';
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';
import CreateRoomIcon from '../../../../assets/icon/create-room-icon.svg';
import CreateRoom from '../chat-modal/createroom-modal/Createroom';

const BG = styled.div`
  display: flex-start;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 85vh;
  background-color: #ffffff;
  padding-left: 3rem 0;
  padding-right: 3rem 0;
  position: relative;
`;

const AddChannelButton = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background-color: #6d77af;
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

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  flex: none;
  flex-grow: 0;
`;

export default function Channel() {
  const [isOpenCreateRoomModal, setIsOpenCreateRoomModal] =
    useState<boolean>(false);

  const handleClickModal = () => {
    setIsOpenCreateRoomModal(!isOpenCreateRoomModal);
  };

  const openModal = () => {
    setIsOpenCreateRoomModal(true);
  };

  const closeModal = () => {
    setIsOpenCreateRoomModal(false);
  };

  return (
    <Layout
      Header={<Header title="Channel" channelToggle toggleMove />}
      Footer={<Footer tab="channel" />}
    >
      <BG>
        <ChannelList />
        <AddChannelButton onClick={openModal}>
          <Icon src={CreateRoomIcon} />
        </AddChannelButton>
        <CreateRoom
          isOpenCreateRoomModal={isOpenCreateRoomModal}
          handleClickModal={handleClickModal}
        />
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

// const [isOpenCreateRoomModal, setIsOpenCreateRoomModal] =
// useState<boolean>(false);
// const handleClickModal = () => {
// setIsOpenCreateRoomModal(!isOpenCreateRoomModal);
// };

// return (
// <Layout>
//   <CreateRoom
//     isOpenCreateRoomModal={isOpenCreateRoomModal}
//     handleClickModal={handleClickModal}
//   />
//   </Layout>
