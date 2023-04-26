import React from 'react';
import styled from 'styled-components';
import Layout from '../../../../commons/layout/Layout';

interface ReadyGameProps {
  onClick: () => void;
}

function ReadyGame({ onClick }: ReadyGameProps) {
  return (
    <Layout>
      <ModalWrapper>
        <GameReady>
          <h1>Play game!!</h1>
        </GameReady>
        <CloseButton type="button" onClick={onClick}>
          &times;
        </CloseButton>
      </ModalWrapper>
    </Layout>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e1e3ee;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameReady = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #6d77af;
  padding: 20px;
  border-radius: 10px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

export default ReadyGame;
