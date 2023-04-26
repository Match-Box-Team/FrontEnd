import styled, { keyframes } from 'styled-components';

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
      <GameInfo>
        <GameIcon />
        <GameName />
      </GameInfo>
      <GamePlayers>
        <Player1 />
        <Vs>VS</Vs>
        <Player2 />
      </GamePlayers>
      <GameMaps>
        <SignPost>MAP</SignPost>
        <GameMapFlow>{/* <MapList /> */}</GameMapFlow>
      </GameMaps>
      <GameStart>
        <StartButton>START</StartButton>
      </GameStart>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GameIcon = styled.div`
  width: 30%;
  height: 80%;
  background-color: #313c7a;
  margin-top: 1rem;
  margin-left: 2rem;
`;

const GameName = styled.div`
  width: 50%;
  height: 80%;
  background-color: #313c7a;
  margin-top: 1rem;
  margin-right: 2rem;
`;

const GamePlayers = styled.div`
  width: 100%;
  height: 20%;
  background-color: #e1e3ee;
  display: flex;
  align-items: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const Player1 = styled.div`
  width: 40%;
  height: 80%;
  background-color: #e1e3ee;
  margin-top: 1rem;
`;

const Player2 = styled.div`
  width: 40%;
  height: 80%;
  background-color: #e1e3ee;
  margin-top: 1rem;
`;

const Vs = styled.div`
  width: 20%;
  height: 80%;
  background-color: #e1e3ee;
  margin-top: 1rem;
  color: red;
  -webkit-text-stroke-width: 0.2rem;
  -webkit-text-stroke-color: black;
  font-size: 4rem;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-left: 2rem;
  background-color: #6d77af;
  color: white;
  font-size: 4rem;
  font-weight: 900;
  padding-top: 1rem;
  border-radius: 2rem 2rem 0 0;
  z-index: 10;
  position: relative;
  top: 0.25px;
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

const StartButton = styled.button`
  width: 70%;
  height: 70%;
  background-color: red;
  margin-top: 2rem;
  border-radius: 4rem;
  border-color: white;
  border-width: 1rem;
  color: white;
  font-size: 5rem;
  font-weight: 900;
  &:active {
    animation: ${clickAnimation} 0.2s;
  }
`;
