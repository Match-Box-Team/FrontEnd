import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import GameSelect from './component/GameSelect';
import Layout from '../../../commons/layout/Layout';
import Header from '../../../commons/header/Header';
import Footer from '../../../commons/footer/Footer';
import GameHistory from './component/GameHistory';
import { useGetGameList, useGetGameWatchList } from '../../../../api/Game';
import { IGameHistory, IGameInfo, IMatch } from '.';
import { getImageUrl } from '../../../../api/ProfileImge';
import { userState } from '../../../../recoil/locals/login/atoms/atom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.8rem;
  align-items: center;
  padding: 0 2.4rem;
`;

const GameSelectWrapper = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const GameHistorytWrapper = styled.ul`
  list-style: none;
  margin-top: 2.5rem;
  padding: 0 0 0 0;
  > li + li {
    margin-top: 1.3rem;
  }
`;

interface Prop {
  title: string;
}

export default function GamePage({ title }: Prop) {
  const userInfo = useRecoilValue(userState);
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [gameName, setGameName] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<string>(gameName);
  const [gameHistoryData, setGameHistoryData] = useState<IGameHistory[]>();
  const [gameIdMapping, setGameIdMapping] = useState<Map<string, string>>(
    new Map(),
  );
  const { data: gameInfos } = useGetGameList();
  const handleError = () => {
    navigate('/404');
  };
  const {
    data: gameWatchData,
    isLoading,
    isError,
  } = useGetGameWatchList(gameId, handleError);

  useEffect(() => {
    if (gameInfos) {
      const createGameIdMapping = async () => {
        const newGameIdMapping = new Map();

        gameInfos.forEach((game: IGameInfo) => {
          newGameIdMapping.set(game.name, game.gameId);
        });

        setGameIdMapping(newGameIdMapping);
      };

      createGameIdMapping();
    }
  }, [gameInfos]);

  useEffect(() => {
    if (gameWatchData) {
      setGameName(gameWatchData.gameName);
      const updateGameHistoryData = async () => {
        const newGameHistory: IGameHistory[] = await Promise.all(
          gameWatchData.matches.map(async (data: IMatch) => {
            const imageUrlOfUser1 = await getImageUrl(
              data.user1.userId,
              userInfo.token,
            );
            const imageUrlOfUser2 = await getImageUrl(
              data.user2.userId,
              userInfo.token,
            );
            return {
              user1: data.user1.nickname,
              user1Image: imageUrlOfUser1,
              user2: data.user2.nickname,
              user2Image: imageUrlOfUser2,
              currentViewer: data.currentViewer,
              matchId: data.gameWatchId,
            };
          }),
        );
        setGameHistoryData(newGameHistory);
      };
      updateGameHistoryData();
    }
  }, [gameWatchData]);

  const handleGameChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedGame(event.target.value);
    const newGameId = gameIdMapping.get(event.target.value);
    if (newGameId) {
      // gameId가 변경되면 해당 gameId로 페이지를 이동합니다.
      navigate(`/game/watch/${newGameId}`);
    }
  };

  return (
    <Layout
      Header={<Header title={title} friendToggle toggleMove />}
      Footer={<Footer tab="Game" />}
    >
      <Container>
        <GameSelectWrapper>
          <GameSelect
            gameName={gameName}
            selectedGame={selectedGame}
            setSelectedGame={setSelectedGame}
            handleGameChange={handleGameChange}
          />
        </GameSelectWrapper>
        <GameHistorytWrapper>
          {gameHistoryData &&
            gameHistoryData?.map((data: IGameHistory) => {
              return (
                <GameHistory
                  key={data.matchId}
                  matchId={data.matchId}
                  user1={data.user1}
                  user2={data.user2}
                  user1Image={data.user1Image}
                  user2Image={data.user2Image}
                  currentViewer={data.currentViewer}
                  selectedGame={selectedGame}
                />
              );
            })}
        </GameHistorytWrapper>
      </Container>
    </Layout>
  );
}
