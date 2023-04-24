import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isErrorOnGet } from '../../../../../recoil/globals/atoms/atom';
import ErrorPopup from '../../../../commons/error/ErrorPopup';

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
}

export default function ChannelList() {
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [isErrorGet, setIsErrorGet] = useRecoilState(isErrorOnGet);
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
      } catch (error) {
        setIsErrorGet(true);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <ErrorPopup message="요청을 처리할 수 없습니다." />
      <Outline>
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
      </Outline>
    </>
  );
}
