import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { ModifierFlags } from 'typescript';
import Layout from '../../../commons/layout/Layout';

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

const ChannelList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  gap: 0;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  background-color: #ffffff;
  border: 1px solid #d8d8d8;
`;

const ChannelItem = styled.li`
  width: 100%;
  text-align: start;
  margin-left: 2rem;
`;

const RoomTitle = styled.span`
  font-size: 1.5rem;
  color: #000000;
  text-decoration: none; /* 밑줄 없애기 */
  color: inherit; /* 클릭 후 색상 변화 없애기 */
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
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bgRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = process.env.REACT_APP_TOKEN;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get(
          'http://127.0.0.1:3000/channels',
          config,
        );
        setChannels(response.data.channel);
        console.log(response.data.channel);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <BG ref={bgRef}>
        <h1>Channels</h1>
        <ChannelList>
          {channels.map(channel => (
            <List key={channel.channelId}>
              <ChannelItem>
                <Link
                  to={`/chat/channel/${channel.channelId}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <RoomTitle>
                    {channel.channelName} (현재인원: {channel.count}명){' '}
                  </RoomTitle>
                </Link>
              </ChannelItem>
            </List>
          ))}
        </ChannelList>
        <AddChannelButton onClick={openModal}>+</AddChannelButton>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={
            channels.length && channels.length > 3
              ? {
                  ...customModalStyle,
                  content: {
                    ...customModalStyle.content,
                    width: '412px',
                  },
                }
              : customModalStyle
          }
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
