import React from 'react';
import styled, { keyframes } from 'styled-components';
import Layout from '../../../commons/layout/Layout';
import PingPong from './games/PingPong';

const clickAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
`;

export default function PlayGame() {
  return (
    <Layout>
      <GameFrame>
        <GameHeader>
          <Player1 />
          <GameInfo />
          <Player2 />
        </GameHeader>
        <Score>
          <Player1Score />
          <h1>SCORE</h1>
          <Player2Score />
        </Score>
        <GameBoard>
          <PingPong />
        </GameBoard>
        <GameFooter>
          <GGButton>GG</GGButton>
        </GameFooter>
      </GameFrame>
    </Layout>
  );
}

const GameFrame = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e1e3ee;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
`;

const GameHeader = styled.div`
  width: 90%;
  height: 10%;
  background-color: #313c7a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 900;
  border-radius: 1.5rem;
`;

const Player1 = styled.div`
  width: 20%;
  height: 80%;
  background-color: #e1e3ee;
`;

const Player2 = styled.div`
  width: 20%;
  height: 80%;
  background-color: #e1e3ee;
`;

const GameInfo = styled.div`
  width: 50%;
  height: 80%;
  background-color: #313c7a;
`;

const Score = styled.div`
  width: 90%;
  height: 5%;
  background-color: #e1e3ee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 900;
  border-radius: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Player1Score = styled.div`
  width: 20%;
  height: 80%;
  background-color: #e1e3ee;
  border: black solid 0.4rem;
`;

const Player2Score = styled.div`
  width: 20%;
  height: 80%;
  background-color: #e1e3ee;
  border: black solid 0.4rem;
`;

const GameBoard = styled.div`
  width: 90%;
  height: 80vh;
  background-color: white;
  border: black solid 0.4rem;
  padding: 1rem;
`;

const GameFooter = styled.div`
  width: 90%;
  height: 10%;
  background-color: #313c7a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 900;
  border-radius: 1.5rem;
`;

const GGButton = styled.button`
  width: 70%;
  height: 80%;
  background-color: red;
  border-radius: 4rem;
  border-color: white;
  border-width: 1rem;
  color: white;
  font-size: 3rem;
  font-weight: 900;
  &:active {
    animation: ${clickAnimation} 0.2s;
  }
`;
