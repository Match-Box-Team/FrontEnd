import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { NoXPopup } from '../../../../commons/modals/popup-modal/Popup';
import { User } from '../../../login/login-page/CheckLogin';
import { ButtonsWrap, BuyButton } from '../buygame-modal/BuyGame';

interface Props {
  enemyInfo: User;
  handleClickModal: () => void;
  socketRef: React.RefObject<Socket> | null;
}

export default function AcceptGameModal({
  enemyInfo,
  handleClickModal,
  socketRef,
}: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    // 초대 보낸 유저가 초대를 취소함
    socketRef?.current?.once('inviteCancel', () => {
      console.log('상대가 초대를 취소함');
      handleClickModal();
    });

    // 게임 준비방으로 이동
    socketRef?.current?.once(
      'goGameReadyPage',
      (gameWatchId: { gameWatchId: string }) => {
        console.log('방장 아닌 유저가 게임 페이지로 이동');
        navigate(`/game/${gameWatchId.gameWatchId}/ready`);
        handleClickModal();
      },
    );

    return () => {
      socketRef?.current?.off('inviteCancel');
      socketRef?.current?.off('goGameReadyPage');
    };
  });

  const handleAccept = () => {
    console.log('게임 초대 수락');
    socketRef?.current?.emit('inviteResolve', { userId: enemyInfo.userId });
  };

  const handleReject = () => {
    console.log('게임 초대 거부');
    socketRef?.current?.emit('inviteReject', { userId: enemyInfo.userId });
    handleClickModal();
  };

  return (
    <NoXPopup onClose={handleReject}>
      <UserImageWrap>
        <img src={enemyInfo.image} alt="상대 유저 이미지" />
      </UserImageWrap>
      <MainText>{enemyInfo.nickname}의 핑퐁핑퐁 게임 신청</MainText>
      <ButtonsWrap>
        <BuyButton yes onClick={() => handleAccept()}>
          수락
        </BuyButton>
        <BuyButton yes={false} onClick={() => handleReject()}>
          거절
        </BuyButton>
      </ButtonsWrap>
    </NoXPopup>
  );
}

const UserImageWrap = styled.div`
  margin-top: 30px;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MainText = styled.p`
  padding-top: 1rem;
  color: #3f4d97;
  font-size: 2rem;
  font-weight: bold;
`;
