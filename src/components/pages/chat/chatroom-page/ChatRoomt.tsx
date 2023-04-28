import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Socket, io } from 'socket.io-client';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import Layout from '../../../commons/layout/Layout';
import InputChat from './components/InputChat';
import MessageList from './components/MessageList';
import { Message } from './components/Message';
import Header from '../../../commons/header/Header';
import { IChat, IChatLog, IEnterReply, IError, ISendedMessage } from '.';
// import { getChatRoomLog } from '../../../../api/Channel';
import Footer from '../../../commons/footer/Footer';
import { userState } from '../../../../recoil/locals/login/atoms/atom';
import { getImageUrl, toBase64 } from '../../../../api/ProfileImge';
import { useNewChatMessageHandler } from './hooks';
import { useGetChatRoomLog } from '../../../../api/Channel';
import RoomSide from '../chat-modal/roomside-modal/RoomSide';
import Profile, {
  Member,
  initialMember,
} from '../../../commons/modals/profile-modal/Profile';

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

  const handleClickSideModal = () => {
    setIsOpenSideModal(!isOpenSideModal);
  };

  const socketRef = useRef<Socket | null>(null);
  const scrollBottomRef = useRef<HTMLLIElement>(null);
  const { id } = useParams<string>();
  const [messages, setMessages] = useState<Array<IChat>>([]);
  const userInfo = useRecoilValue(userState);
  const [channelName, setChannelName] = useState<string>('Channel');
  const {
    data: chatListData,
    isLoading,
    isError,
  } = useGetChatRoomLog(id || '');
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
          authorization: `Bearer ${userInfo.token}`,
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
      muteKick: {
        isAdmin: message.userChannel.isAdmin,
        isMute: message.userChannel.isMute,
      },
    };
    const imageUrl = await axios.get(
      `http://localhost:3000/account/image?userId=${member.userId}`,
      {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${userInfo.token}` },
      },
    );
    member.image = await toBase64(imageUrl.data);
    setSelectedUser(member);
    setIsOpenProfileModal(true);
  };

  return (
    <Layout
      Header={
        <Header
          title={channelName}
          channelBurger
          handleClickSideModal={handleClickSideModal}
          backPath="/chat/channel"
        />
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
                message={message}
                onClickCapture={handleSelectChat}
                onClick={handleClickProfileModal}
              />
            ))}
            <li ref={scrollBottomRef} />
          </MessageList>
        </Container>
      </Base>
    </Layout>
  );
}
