import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isErrorOnGet } from '../../../../../recoil/globals/atoms/atom';
import ErrorPopup from '../../../../commons/error/ErrorPopup';
import PwdSetModal from './PwdSetModal';

const Outline = styled.ul`
  display: flex;
  margin-top: 0;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  gap: 0;
  height: inherit;
  overflow-y: auto;
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
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const RoomTitle = styled.span`
  font-size: 1.5rem;
  color: #000000;
  text-decoration: none;
  color: inherit;
`;

interface IChannel {
  channelId: string;
  channelName: string;
  count: number;
  password: string | null;
}

export default function ChannelList() {
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [isErrorGet, setIsErrorGet] = useRecoilState(isErrorOnGet);
  const [showModal, setShowModal] = useState(false);
  const [currentChannelId, setCurrentChannelId] = useState('');

  const navigate = useNavigate();

  const openModal = (channelId: string) => {
    setCurrentChannelId(channelId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    closeModal();
    navigate(`/chat/channel/${currentChannelId}`);
  };

  const handleClick = (channelId: string, password: string | null) => {
    if (password === null) {
      navigate(`/chat/channel/${channelId}`);
    } else {
      openModal(channelId);
    }
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
        console.log('Res: ', response.data.channel); //
      } catch (error) {
        setIsErrorGet(true);
      }
    };

    fetchData();
  }, []);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    channelId: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      openModal(channelId);
    }
  };

  return (
    <>
      <ErrorPopup message="요청을 처리할 수 없습니다." />
      <Outline>
        {channels.map(channel => (
          <List key={channel.channelId}>
            <ChannelItem>
              <div
                role="button"
                tabIndex={0}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  width: '100%',
                  height: '100%',
                }}
                onClick={() => handleClick(channel.channelId, channel.password)}
                onKeyDown={event => handleKeyDown(event, channel.channelId)}
              >
                <RoomTitle>
                  {channel.channelName} (현재인원: {channel.count}명){' '}
                </RoomTitle>
              </div>
            </ChannelItem>
          </List>
        ))}
      </Outline>
      <PwdSetModal show={showModal} handleClose={closeModal}>
        <h2>모달의 내용이 여기에 표시됩니다.</h2>
        <button type="button" onClick={handleConfirm}>
          확인
        </button>
        <button type="button" onClick={closeModal}>
          닫기
        </button>
      </PwdSetModal>
    </>
  );
}
