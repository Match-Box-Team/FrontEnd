import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Socket, io } from 'socket.io-client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../../commons/layout/Layout';
import InputChat from './components/InputChat';
import MessageList from './components/MessageList';
import { Message } from './components/Message';
import Header from '../../../commons/header/Header';
import { IChat, IError, ISendedMessage } from '.';
import { useGetChatRoomLog } from '../../../../api/Channel';
import { userState } from '../../../../recoil/locals/login/atoms/atom';
import { getImageUrl } from '../../../../api/ProfileImge';
import { useNewChatMessageHandler } from './hooks';
import ErrorPopup from '../../../commons/error/ErrorPopup';
import { isErrorOnGet } from '../../../../recoil/globals/atoms/atom';

const Base = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6.4rem;
  align-items: center;
  padding: 0 2.4rem;
`;

export default function ChatRoom() {
  const socketRef = useRef<Socket | null>(null);
  const scrollBottomRef = useRef<HTMLLIElement>(null);
  const { id } = useParams<string>();
  const [messages, setMessages] = useState<Array<IChat>>([]);
  const userInfo = useRecoilValue(userState);
  const [channelName, setChannelName] = useState<string>('Channel');
  const [isErrorGet, setIsErrorGet] = useRecoilState(isErrorOnGet);
  const {
    data: chatListData,
    isLoading,
    isError,
  } = useGetChatRoomLog(id || '');
  const handleNewChatMessage = useNewChatMessageHandler(userInfo, setMessages);
  const navigate = useNavigate();

  const handleSend = (content: ISendedMessage) => {
    socketRef.current?.emit('chat', content, handleNewChatMessage);
  };

  const handleError = () => {
    setIsErrorGet(false);
    navigate('/chat/channel');
  };

  useEffect(() => {
    socketRef.current = io(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/channel`,
      {
        path: '/socket.io',
        extraHeaders: {
          authorization: `Bearer ${userInfo.token}`,
        },
      },
    );

    socketRef.current.emit('enterChannel', { channelId: id });

    socketRef.current.on('error', (error: IError) => {
      setIsErrorGet(true);
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
        isErrorGet ? (
          <Header title={channelName} />
        ) : (
          <Header title={channelName} channelBurger backPath="/chat/channel" />
        )
      }
      Footer={<InputChat onClick={handleSend} channelId={id} />}
    >
      <Base>
        <Container>
          {isErrorGet ? (
            <ErrorPopup
              message="[소켓 연결 에러] 채팅방에 입장할 수 없습니다 "
              handleClick={handleError}
            />
          ) : (
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
          )}
        </Container>
      </Base>
    </Layout>
  );
}
