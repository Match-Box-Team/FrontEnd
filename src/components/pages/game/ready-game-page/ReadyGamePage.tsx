import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../playgame-page/game-socket/GameSocketContext';
import ReadyGame from '../game-modal/readygame-modal/ReadyGame';
import { userState } from '../../../../recoil/locals/login/atoms/atom';
import { useGameWatchForReady } from '../../../../api/GameWatch';
import Layout from '../../../commons/layout/Layout';

export interface UserGameInfo {
  userId: string;
  gameId: string;
  userGameId: string;
  enemyUserId: string;
  enemyUserGameId: string;
  role: string;
}

export default function ReadyGamePage() {
  const navigate = useNavigate();
  const socketRef = useSocket();
  const userInfo = useRecoilValue(userState);

  // 게임 준비 모달
  const [isOpenReadyGame, setIsOpenReadyGame] = useState<boolean>(true);
  const handleClickModal = () => {
    setIsOpenReadyGame(!isOpenReadyGame);
  };
  const { pathname } = window.location;
  const gameWatchId = pathname.split('/')[2];
  const { data: gameWatch } = useGameWatchForReady(gameWatchId, userInfo.token);

  useEffect(() => {
    if (!gameWatch) {
      return;
    }
    socketRef?.emit('startReadyGame', gameWatch);
  }, [gameWatch]);

  return (
    <Layout>
      {isOpenReadyGame && (
        <ReadyGame onClick={handleClickModal} gameWatch={gameWatch} />
      )}
    </Layout>
  );
}
