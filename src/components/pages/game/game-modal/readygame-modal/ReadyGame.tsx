import React from 'react';
import styled from 'styled-components';
import Layout from '../../../../commons/layout/Layout';

interface ReadyGameProps {
  onClick: () => void;
}

export default function ReadyGame({ onClick }: ReadyGameProps) {
  return (
    <ModalWrapper>
      <CloseButton type="button" onClick={onClick}>
        &times;
      </CloseButton>
      <GameReady>GAME READY</GameReady>
      <GameInfo />
      <GamePlayers />
      <GameMaps>
        <SignPost />
        <GameMapFlow />
      </GameMaps>
      <GameStart />
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-53%);
  width: 100%;
  height: 100%;
  background-color: #e1e3ee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const GameReady = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  font-size: 5rem;
  font-weight: 900;
  margin-top: 5rem;
  margin-bottom: 1.5rem;
  color: #3f4d97;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 3rem;
  font-weight: 900;
  background: none;
  color: grey;
  border: none;
  cursor: pointer;
`;

const GameInfo = styled.div`
  width: 90%;
  height: 20%;
  background-color: #313c7a;
  border-radius: 3rem;
`;

const GamePlayers = styled.div`
  width: 100%;
  height: 20%;
  background-color: #e1e3ee;
`;

const GameMaps = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
`;

const SignPost = styled.div`
  width: 40%;
  height: 25%;
  background-color: #6d77af;
  margin-left: 2rem;
  border-radius: 2rem 2rem 0 0;
`;

const GameMapFlow = styled.div`
  width: 100%;
  height: 75%;
  background-color: #6d77af;
`;

const GameStart = styled.div`
  width: 100%;
  height: 20%;
  background-color: #e1e3ee;
`;
