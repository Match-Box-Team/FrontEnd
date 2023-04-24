import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isErrorOnGet } from '../../../../../recoil/globals/atoms/atom';
import ErrorPopup from '../../../../commons/error/ErrorPopup';
import { getImageUrl } from '../../../../../api/ProfileImge';
import { getChatRoomInfo } from '../../../../../api/ChatRoomInfo';
import MyRoomMain from './MyRoomMain';

export default function MyMsgList() {
  const [channels, setChannels] = useState<any[]>([]);
  const [isErrorGet, setIsErrorGet] = useRecoilState(isErrorOnGet);
  const [imageUrl, setImageUrl] = useState('');
  const [myRooms, setMyRooms] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = process.env.REACT_APP_TOKEN;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get(
          'http://127.0.0.1:3000/channels/my',
          config,
        );
        // console.log(response.data);

        const roomListPromises = response.data.channel.map(
          async (channel: any) => {
            const RoomList = await getChatRoomInfo(
              channel.userChannel.channel.channelId,
            );
            return RoomList;
          },
        );

        const tmpList: any[] = [];
        const fetchedRoomLists = await Promise.all(roomListPromises);
        const rooms = fetchedRoomLists.map(item => item.userChannel);
        rooms.forEach(list => {
          tmpList.push(list);
        });

        setMyRooms(tmpList);

        const tmpUrl = await getImageUrl(
          response.data.channel[0].user[0].user.userId,
        );
        setImageUrl(tmpUrl);
        setChannels(response.data.channel);
        // console.log(response.data.channel[0].userChannel.channel.channelId);
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
        {channels.map((room, index) => (
          <List key={room.userChannel.userChannelId}>
            <RoomItem>
              <Link
                to={`/chat/channel/${room.userChannel.channel.channelId}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  width: '100%',
                }}
              >
                <RoomMain>
                  <RoomContent>
                    <ProfileImg>
                      <img
                        src={imageUrl}
                        alt="profile"
                        width="100%"
                        height="100%"
                      />
                    </ProfileImg>
                    <RoomBody>
                      <RoomTitle>
                        {room.userChannel.channel.channelName}
                      </RoomTitle>
                      <RoomMemeber>
                        {myRooms[index] &&
                          myRooms[index].map(
                            (item: any, memberIndex: number) => {
                              if (memberIndex < 2) {
                                return (
                                  <Member key={item.user.userId}>
                                    {item.user.nickname}
                                  </Member>
                                );
                              }
                              if (memberIndex === 2) {
                                return (
                                  <Member key={item.user.userId}>
                                    외 {myRooms[index].length - 2}명
                                  </Member>
                                );
                              }
                              return null;
                            },
                          )}
                      </RoomMemeber>
                    </RoomBody>
                  </RoomContent>
                  <RoomInfo>
                    <LastMsgTime as="span">
                      {new Date(room.chat.time).toISOString().split('T')[0]}
                    </LastMsgTime>
                    <UnreadMsgCount
                      style={{
                        backgroundColor:
                          room.chat.computedChatCount === 0 ? 'white' : 'red',
                      }}
                    >
                      <Unread>{room.chat.computedChatCount}</Unread>
                    </UnreadMsgCount>
                  </RoomInfo>
                </RoomMain>
                {/* <MyRoomMain
                  imageUrl={imageUrl}
                  room={room}
                  index={index}
                  myRooms={myRooms}
                /> */}
              </Link>
            </RoomItem>
          </List>
        ))}
      </Outline>
    </>
  );
}

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
  height: 10rem;
  background-color: #ffffff;
  border: 1px solid #d8d8d8;
`;

const RoomItem = styled.li`
  width: 100%;
  justify-content: space-between;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
`;

const RoomMain = styled.div`
  display: flex;
  width: 100%;
  text-align: start;
  margin-right: 2rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  justify-content: space-between;
`;

const ProfileImg = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: #ad4545;
  border-radius: 2.5rem;
  overflow: hidden;
  margin-left: 1rem;
  margin-right: 3.5rem;
`;

const RoomTitle = styled.div`
  font-size: 1.5rem;
  color: #000000;
  text-decoration: none;
  color: inherit;
  text-align: left;
`;

const RoomMemeber = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  color: #000000;
  text-decoration: none;
  color: inherit;
  text-align: left;
  margin-top: 1rem;
`;

const Member = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 0.5rem;
`;

const RoomContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 0.5rem;
`;

const RoomBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  width: 20%;
`;

const LastMsgTime = styled.div`
  font-size: 0.5rem;
  color: #797171;
  text-decoration: none;
`;

const UnreadMsgCount = styled.div`
  font-size: 1rem;
  color: white;
  text-decoration: none;
  border-radius: 1rem;
  margin-top: 1rem;
`;

const Unread = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  margin: 0.5rem;
  border-radius: 50%;
`;
