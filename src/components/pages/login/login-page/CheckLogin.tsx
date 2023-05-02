import { ReactNode, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import { isExpired } from 'react-jwt';
import styled from 'styled-components';
import { userState } from '../../../../recoil/locals/login/atoms/atom';
import { NError } from '../../chat/chatroom-page';
import AcceptGameModal from '../../game/game-modal/accept-game-modal/AcceptModal';
import { getImageUrl } from '../../../../api/ProfileImge';
import AcceptWaiting from '../../game/game-modal/accept-waiting-modal/AcceptWaiting';

export const fakeUserId1 = '513a6272-c55e-4f99-8d10-879fc2bf5b3e';
export const fakeUserId2 = '175b000e-c3a9-43a0-8c0e-120d079b3dd2';

interface Props {
  children: ReactNode;
}

export interface User {
  userId: string;
  nickname: string;
  status: string;
  email: string;
  image: string;
  intraId: string;
  phoneNumber: string | null;
}

export default function CheckLogin({ children }: Props) {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const setUserState = useSetRecoilState(userState);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (userInfo.token === '') {
      socketRef.current?.close();
      navigate('/');
      return;
    }
    if (isExpired(userInfo.token) === true) {
      const resetUser = {
        token: '',
        userId: '',
        nickname: '',
        imageUrl: '',
      };
      setUserState(resetUser);
      socketRef.current?.close();
      navigate('/');
      return;
    }
    if (userInfo.token !== '' && socketRef.current === null) {
      socketRef.current = io(`${process.env.REACT_APP_BASE_BACKEND_URL}`, {
        path: '/socket.io',
        extraHeaders: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      socketRef.current.emit('login');
      socketRef.current.on('error', (error: NError) => {
        console.log(error);
        const resetUser = {
          token: '',
          userId: '',
          nickname: '',
          imageUrl: '',
        };
        setUserState(resetUser);
        navigate('/');
      });
    }
  });

  const [enemyInfo, setEnemyInfo] = useState<User | null>(null);

  // 게임 초대 이벤트 모니터링 -> 감지시 게임 초대 수락 모달 띄움
  useEffect(() => {
    // 게임 초대를 받음
    console.log(socketRef);
    socketRef.current?.once('inviteGame', async (user: User) => {
      console.log('게임 초대 받음');
      const imageUrl = await getImageUrl(user.userId, userInfo.token);
      setEnemyInfo({
        ...user,
        image: imageUrl,
      });
      setIsOpenAcceptGameModal(true);
    });

    socketRef.current?.once('gameError', (message: { message: string }) => {
      console.log(message.message);
      setIsOpenAcceptGameModal(false);
      setIsOpenAcceptWaitingModal(false);
    });

    return () => {
      socketRef.current?.off('inviteGame');
      socketRef.current?.off('gameError');
    };
  });

  // 게임 초대 수락 모달
  const [isOpenAcceptGameModal, setIsOpenAcceptGameModal] =
    useState<boolean>(false);
  const handleClickAcceptModal = () => {
    setIsOpenAcceptGameModal(!isOpenAcceptGameModal);
  };

  // 초대 수락 대기 모달
  const [isOpenAcceptWaitingModal, setIsOpenAcceptWaitingModal] =
    useState<boolean>(false);
  const onCloseWaitingModal = () => {
    setIsOpenAcceptWaitingModal(false);
  };

  // 가짜 게임 신청
  const handleClickSocket = (isFake1: boolean) => {
    if (isFake1) {
      socketRef.current?.emit('inviteGame', { userId: fakeUserId1 });
    } else {
      socketRef.current?.emit('inviteGame', { userId: fakeUserId2 });
    }
    setIsOpenAcceptWaitingModal(true);
  };

  return (
    <div>
      <Test1Button type="submit" onClick={() => handleClickSocket(true)}>
        가짜1에게 게임 신청
      </Test1Button>
      <Test2Button type="submit" onClick={() => handleClickSocket(false)}>
        가짜2에게 게임 신청
      </Test2Button>
      {isOpenAcceptGameModal && enemyInfo && (
        <AcceptGameModal
          enemyInfo={enemyInfo}
          handleClickModal={handleClickAcceptModal}
          socketRef={socketRef}
        />
      )}
      {isOpenAcceptWaitingModal && (
        <AcceptWaiting
          handleClickModal={onCloseWaitingModal}
          socketRef={socketRef}
        />
      )}
      {children}
    </div>
  );
}

const Test1Button = styled.button`
  position: absolute;
  left: 10%;
  // top: 5%;
  font-size: 20px;
`;

const Test2Button = styled.button`
  position: absolute;
  left: 50%;
  // top: 10%;
  font-size: 20px;
`;

const Test3Button = styled.button`
  position: absolute;
  left: 20%;
  top: 5%;
  font-size: 20px;
`;
