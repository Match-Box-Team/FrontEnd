import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Layout from '../../../commons/layout/Layout';
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';
import PingPongIcon from '../../../../assets/icon/pingpong.svg';
import TestrisIcon from '../../../../assets/icon/testris.svg';
import PuzzleIcon from '../../../../assets/icon/puzzle.svg';
import ZombieIcon from '../../../../assets/icon/zombie.svg';

interface Game {
  gameId: string;
  name: string;
  price: number;
  isPlayable: boolean;
  isBuy: boolean;
}

interface BuyButtonProps {
  isBuy: boolean;
}

interface SelectGameContainerProps {
  isSelected: boolean;
}

const gameIcons = [PingPongIcon, TestrisIcon, PuzzleIcon, ZombieIcon];

export default function GameShop() {
  const [games, setGames] = useState<Game[] | null>(null);

  const [selectedGameIndex, setSelectedGameIndex] = useState<number | null>(
    null,
  );

  const handleGameSelect = (index: number) => {
    setSelectedGameIndex(index);
    console.log(games);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`http://localhost:3000/games`, {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
      });
      setGames(data.data);
    };
    fetchData();
  }, []);

  return (
    <Layout
      Header={<Header title="Game Shop" />}
      Footer={<Footer tab="game" />}
    >
      <GameShopDiv>
        <ManualTextWrap>
          <p>게임을 관전하려면 아이콘을 클릭하세요!</p>
        </ManualTextWrap>
        <SelectGameDiv>
          <SelectGameGridDiv>
            {games?.map((game, index) => {
              return (
                <SelectGameContainer
                  isSelected={selectedGameIndex === index}
                  onClick={() => handleGameSelect(index)}
                >
                  <GameImageWrap>
                    <img src={gameIcons[index]} alt={gameIcons[index]} />
                    <strong>{game.name}</strong>
                    <p>{`${game.price.toLocaleString('en-US')}₩`}</p>
                    <BuyButton isBuy={game.isBuy}>BUY</BuyButton>
                  </GameImageWrap>
                </SelectGameContainer>
              );
            })}
          </SelectGameGridDiv>
          <GameWatchingButton>관전하기</GameWatchingButton>
        </SelectGameDiv>
      </GameShopDiv>
    </Layout>
  );
}

const GameShopDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ManualTextWrap = styled.div`
  margin: 25px 0px;
  > p {
    color: #ad46c7;
    text-align: center;
    font-size: 1.4rem;
  }
`;

const SelectGameDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  background-color: #e1e3ee;
  border-radius: 15px;
`;

const SelectGameGridDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
`;

const SelectGameContainer = styled.div<SelectGameContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 2rem;
  border: 5px solid transparent;
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    `
  border: 5px solid #31D37C;
  `};
`;

const GameImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > img {
    width: 11rem;
    height: 11rem;
  }
  > strong {
    margin: 10px 0px;
    font-size: 1.8rem;
  }
  > p {
    margin: 0px;
    font-size: 1.8rem;
    color: #14ae5c;
    font-weight: bold;
  }
`;

const BuyButton = styled.button<BuyButtonProps>`
  margin-top: 10px;
  font-family: 'NanumGothic';
  background-color: ${({ isBuy }) => (isBuy ? '#B3B3B3' : '#D84A4A')};
  color: white;
  font-weight: bold;
  font-size: 1.8rem;
  border-radius: 7.5px;
  border: none;
  width: 6rem;
`;

const GameWatchingButton = styled.button`
  margin-bottom: 20px;
  background-color: #6d77af;
  color: white;
  border: 1px solid black;
  font-size: 2rem;
  padding: 1rem;
`;
