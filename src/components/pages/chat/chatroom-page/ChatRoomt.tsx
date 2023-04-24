import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { AxiosError, AxiosResponse } from 'axios';
import { io } from 'socket.io-client';
import { useMutation, useQuery } from 'react-query';
// import { fetchChatRoomDetail } from '../apis/roomApi';
// import { IChat, IProfile, IRoom } from '../types';
// import { fetchChatMessageList, sendChatMessage } from '../apis/chatApi';
// import { API_HOST } from '../config';
// import { fetchMyProfile } from '../apis/userApi';
import Layout from '../../../commons/layout/Layout';
import InputChat from './components/InputChat';
import MessageList from './components/MessageList';
import { Message } from './components/Message';

const Base = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  align-items: center;
  padding: 0 24px;
`;

export default function ChatRoom() {
  const scrollBottomRef = useRef<HTMLLIElement>(null);
  const { roomId } = useParams<string>();

  //   const { data: profileData } = useQuery<AxiosResponse<IProfile>, AxiosError>(
  //     'fetchMyProfile',
  //     fetchMyProfile,
  //   );
  //   const { data: chatRoomDetailData } = useQuery<
  //     AxiosResponse<IRoom>,
  //     AxiosError
  //   >(['fetchChatRoomDetail', roomId], () =>
  //     fetchChatRoomDetail(roomId as string),
  //   );

  //   const [messages, setMessages] = useState<Array<IChat>>([]);

  //   const { data: chatListData } = useQuery<
  //     AxiosResponse<Array<IChat>>,
  //     AxiosError
  //   >(['fetchChatMessageList', roomId, messages], () =>
  //     fetchChatMessageList(roomId as string),
  //   );

  //   const mutation = useMutation('sendChatMessage', (content: string) =>
  //     sendChatMessage(roomId as string, content),
  //   );

  //   const handleSend = (content: string) => {
  //     if (content.length) {
  //       mutation.mutate(content);
  //     }
  //   };

  //   useEffect(() => {
  //     const socket = io(`${API_HOST}/chat`, { path: '/socket.io' });

  //     socket.emit('join', roomId);

  //     socket.on('chat', (newMessage: IChat) => {
  //       setMessages(prevMessages => [...prevMessages, newMessage]);
  //     });
  //   }, []);

  //   useEffect(() => {
  //     scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  //   }, [messages]);

  return (
    <Layout>
      <Base>
        {/* {chatRoomDetailData && (
          <TopNavigation title={chatRoomDetailData.data.user.username} />
        )} */}
        <Container>
          <MessageList>
            {/* <Message
                receiver={"Test"}
                receiverThumbnailImage={"Test"}
                //senderId={"Test"}
                content={"Test"}
                timestamp={dayjs("Test").format('HH:mm')/> */}
            {
              /* {chatListData?.data.map(() => (
              <Message
                key={message.id}
                receiver={message.user?.username}
                receiverThumbnailImage={message.user?.thumbnailImageUrl}
                senderId={message.senderId}
                content={message.content}
                timestamp={dayjs(message.createdAt).format('HH:mm')}
              />
            }
            */

              <li ref={scrollBottomRef} />
            }
          </MessageList>
        </Container>
        {/* <InputChat onClick={handleSend} /> */}
        <InputChat onClick={handleSend} />
      </Base>
    </Layout>
  );
}

/*
import React, { useState } from 'react';
import Layout from '../../../commons/layout/Layout';
import Header from '../../../commons/header/Header';
import Footer from '../../../commons/footer/Footer';
import SetRoom from '../chat-modal/setroom-modal/SetRoom';
import Invite from '../chat-modal/invite-modal/Invite';

export default function ChatRoom() {
  // 채팅방 설정 모달
  const [isOpenSetRoomModal, setIsOpenSetRoomModal] = useState<boolean>(false);
  const handleClickSetRoomModal = () => {
    setIsOpenSetRoomModal(!isOpenSetRoomModal);
  };

  // 친구 초대 모달
  const [isOpenInviteModal, setIsOpenInviteModal] = useState<boolean>(false);
  const handleClickSetInviteModal = () => {
    setIsOpenInviteModal(!isOpenInviteModal);
  };

  return (
    <Layout
      Header={<Header title="Channel" channelBurger backPath="/chat/channel" />}
      Footer={<Footer tab="channel" />}
    >
      <SetRoom
        isOpenSetRoomModal={isOpenSetRoomModal}
        handleClickModal={handleClickSetRoomModal}
      />

      <Invite
        isOpenInviteModal={isOpenInviteModal}
        handleClickModal={handleClickSetInviteModal}
      />
    </Layout>
  );
}



*/
