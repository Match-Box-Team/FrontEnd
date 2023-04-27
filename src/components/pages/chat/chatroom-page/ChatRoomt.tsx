import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { AxiosError, AxiosResponse } from 'axios';
import { Socket, io } from 'socket.io-client';
import { useQuery } from 'react-query';
import Layout from '../../../commons/layout/Layout';
import InputChat from './components/InputChat';
import MessageList from './components/MessageList';
import { Message } from './components/Message';
import Header from '../../../commons/header/Header';
import { IChat, IChatLog, IEnterReply, IError, ISendedMessage } from '.';
import { getChatRoomLog } from '../../../../api/Channel';
import Footer from '../../../commons/footer/Footer';
import { userState } from '../../../../recoil/locals/login/atoms/atom';
import { getImageUrl } from '../../../../api/ProfileImge';
import { useNewChatMessageHandler } from './hooks';

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
  const [isOpenSideModal, setIsOpenSideModal] = useState<boolean>(false);

  const handleClickModal = () => {
    setIsOpenSideModal(!isOpenSideModal);
  };

  const socketRef = useRef<Socket | null>(null);
  const scrollBottomRef = useRef<HTMLLIElement>(null);
  const { id } = useParams<string>();
  const [messages, setMessages] = useState<Array<IChat>>([]);
  const userInfo = useRecoilValue(userState);
  const [channelName, setChannelName] = useState<string>('Channel');
  const { isLoading, isError } = useGetChatRoomLog(id || '');
  const handleNewChatMessage = useNewChatMessageHandler(userInfo, setMessages);

  const handleSend = (content: ISendedMessage) => {
    socketRef.current?.emit('chat', content, handleNewChatMessage);
  };

  useEffect(() => {
    socketRef.current = io(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/channel`,
      {
        path: '/socket.io',
        extraHeaders: {
          authorization: `Bearer ${process.env.REACT_APP_BASE_TOKEN}`,
        },
      },
    );

    socketRef.current.emit('enterChannel', { channelId: id });

    socketRef.current?.on('message', (message: IEnterReply) => {
      // 채팅방에 글 띄우는 걸로 변경
      console.log(message);
    });

    socketRef.current.on('error', (error: IError) => {
      // 에러모달로 변경
      console.error(error);
    });
    socketRef.current.on('chat', handleNewChatMessage);

    return () => {
      socketRef.current?.off('error');
      socketRef.current?.off('chat');
    };
  }, []);

  useEffect(() => {
    if (chatListData) {
      setChannelName(chatListData.channel.channelName);
      const updateMessages = async () => {
        const updatedMessages = await Promise.all(
          chatListData.chat.map(async message => {
            const imageUrl = await getImageUrl(
              message.userChannel.user.userId,
              userInfo.token,
            );
            return {
              ...message,
              userChannel: {
                ...message.userChannel,
                user: {
                  ...message.userChannel.user,
                  image: imageUrl,
                },
              },
            };
          }),
        );
        setMessages(updatedMessages);
      };
      updateMessages();
    }
  }, [chatListData]);

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Layout
      Header={
        <Header title={channelName} channelBurger backPath="/chat/channel" />
      }
      Footer={<InputChat onClick={handleSend} channelId={id} />}
    >
      <RoomSide
        isOpenSideModal={isOpenSideModal}
        handleClickModal={handleClickModal}
      />
      <Base>
        <Container>
          <MessageList>
            {messages.map((message: IChat) => (
              <Message
                key={message.chatId}
                receiver={message.userChannel.user.nickname}
                receiverThumbnailImage={message.userChannel.user.image}
                content={message.message}
                timestamp={message.time}
              />
            ))}
            <li ref={scrollBottomRef} />
          </MessageList>
        </Container>
      </Base>
    </Layout>
  );
}
