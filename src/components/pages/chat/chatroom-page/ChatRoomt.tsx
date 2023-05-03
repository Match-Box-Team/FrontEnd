import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Socket, io } from 'socket.io-client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../../commons/layout/Layout';
import InputChat from './components/InputChat';
import MessageList from './components/MessageList';
import { Message } from './components/Message';
import Header from '../../../commons/header/Header';
import { IChat, IError, ISendedMessage } from '.';
import { getDefaultImageUrl, getImageUrl } from '../../../../api/ProfileImge';
import { useNewChatMessageHandler } from './hooks';
import { useGetChatRoomLog } from '../../../../api/Channel';
import RoomSide from '../chat-modal/roomside-modal/RoomSide';
import Profile, {
  Member,
  initialMember,
} from '../../../commons/modals/profile-modal/Profile';
import ErrorPopup from '../../../commons/error/ErrorPopup';
import { isErrorOnGet } from '../../../../recoil/globals/atoms/atom';
import { userState } from '../../../../recoil/locals/login/atoms/atom';

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
  const [isOpenSideModal, setIsOpenSideModal] = useState<boolean>(false);

  const handleClickSideModal = () => {
    setIsOpenSideModal(!isOpenSideModal);
  };

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
    navigate('/chat/mymsg');
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
      socketRef.current?.off('message');
      socketRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (chatListData) {
      setChannelName(chatListData.channel.channelName);
      const updateMessages = async () => {
        const updatedMessages = await Promise.all(
          chatListData.chat.map(async message => {
            let imageUrl;
            if (message.userChannel.user.userId === '') {
              // 디폴트 사진으로 바꿈.
              imageUrl = await getDefaultImageUrl(userInfo.token);
            } else {
              imageUrl = await getImageUrl(
                message.userChannel.user.userId,
                userInfo.token,
              );
            }

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

  // 유저 프로필 모달
  const [isOpenProfileModal, setIsOpenProfileModal] = useState<boolean>(false);
  const handleClickProfileModal = async () => {
    setIsOpenProfileModal(!isOpenProfileModal);
  };

  const [selectedUser, setSelectedUser] = useState<Member>(initialMember);
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const handleSelectChat = async (message: IChat) => {
    setSelectedChat(message);
    const member: Member = {
      userId: message.userChannel.user.userId,
      intraId: message.userChannel.user.intraId,
      nickname: message.userChannel.user.nickname,
      image: '',
      isMute: message.userChannel.isMute,
    };
    if (message.userChannel.user.userId !== '') {
      member.image = await getImageUrl(member.userId, userInfo.token);
    } else {
      member.image = await getDefaultImageUrl(userInfo.token);
    }
    setSelectedUser(member);
    setIsOpenProfileModal(true);
  };

  return (
    <Layout
      Header={
        isErrorGet ? (
          <Header title={channelName} backPath="/chat/mymsg" />
        ) : (
          <Header
            title={channelName}
            channelBurger
            handleClickSideModal={handleClickSideModal}
            backPath="/chat/mymsg"
          />
        )
      }
      Footer={<InputChat onClick={handleSend} channelId={id} />}
    >
      {isOpenProfileModal && selectedChat && (
        <Profile
          handleClickModal={handleClickProfileModal}
          user={selectedUser}
          inChat
        />
      )}
      <RoomSide
        isOpenSideModal={isOpenSideModal}
        handleClickModal={handleClickSideModal}
        isDm={chatListData?.channel.isDm}
      />
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
                  message={message}
                  onClickCapture={handleSelectChat}
                  onClick={handleClickProfileModal}
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
