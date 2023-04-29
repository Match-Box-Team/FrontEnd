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
    socketRef.current?.on('inviteGame', async (user: User) => {
      console.log('Game Hi');
      console.log(user);
      const imageUrl = await getImageUrl(user.userId, userInfo.token);
      setEnemyInfo({
        ...user,
        image: imageUrl,
      });
      handleClickModal();
    });

    return () => {
      socketRef.current?.off('game');
    };
  }, []);

  // 게임 초대 수락 모달
  const [isOpenAcceptGameModal, setIsOpenAcceptGameModal] =
    useState<boolean>(false);
  const handleClickModal = () => {
    setIsOpenAcceptGameModal(!isOpenAcceptGameModal);
  };

  // 게임 신청 버튼
  const handleClickSocket = (isFake1: boolean) => {
    console.log('소켓');
    const fakeUserId1 = '3e05aadf-8c34-48c9-89fa-c58d4bf720d7';
    const fakeUserId2 = 'fa9eecd4-7bdb-4d61-a0f8-898869d99ca2';
    if (isFake1) {
      socketRef.current?.emit('inviteGame', { userId: fakeUserId1 });
    } else {
      socketRef.current?.emit('inviteGame', { userId: fakeUserId2 });
    }
  };

  return (
    <div>
      <Test1Button type="submit" onClick={() => handleClickSocket(true)}>
        가짜1에게 게임 신청
      </Test1Button>
      <Test2Button type="submit" onClick={() => handleClickSocket(false)}>
        가짜2에게게임 신청
      </Test2Button>
      {isOpenAcceptGameModal && enemyInfo && (
        <AcceptGameModal
          enemyInfo={enemyInfo}
          handleClickModal={handleClickModal}
        />
      )}
      {children}
    </div>
  );
}

const Test1Button = styled.button`
  position: absolute;
  left: 20%;
  font-size: 20px;
`;

const Test2Button = styled.button`
  position: absolute;
  left: 50%;
  font-size: 20px;
`;
