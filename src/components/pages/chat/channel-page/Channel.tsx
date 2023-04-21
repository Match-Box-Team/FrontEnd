import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Layout from '../../../commons/layout/Layout';
import ChannelList from './sub-components/ChannelList';

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

const CloseModalButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const listWidth = `100%`;

const customModalStyle: Modal.Styles = {
  ...Modal.defaultStyles,
  content: {
    ...Modal.defaultStyles.content,
    width: '80%',
    maxWidth: '330px',
    height: '40%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    border: '1px solid #d8d8d8',
    borderRadius: '10px',
    padding: '2rem',
    boxSizing: 'border-box',
  },
};

interface IChannel {
  channelId: string;
  channelName: string;
  count: number;
}

export default function Channel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bgRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <BG ref={bgRef}>
        <h1>Channels</h1>
        <ChannelList />
        <AddChannelButton onClick={openModal}>+</AddChannelButton>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={customModalStyle}
        >
          <CloseModalButton onClick={closeModal}>&times;</CloseModalButton>
          {/* 모달 내용, 채널 생성 폼 */}
        </Modal>
      </BG>
    </Layout>
  );
}

/*
    Header와 Footer를 넣었을 떄
    <Layout Header={<Header/> Footer={<Footer>}}>
    {Contents}
    </Layout>);
  */
