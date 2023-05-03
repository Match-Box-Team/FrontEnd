import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import defaultTheme from '../../../../../styles/theme';

const Base = styled.li`
  position: relative;
  width: 32.5rem;
  height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e1e3ee;
  gap: 1.6rem;
  border-radius: 5%;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
`;

const NickName = styled.span`
  font-size: 2rem;
  font-weight: ${defaultTheme.fontWeight.weightExtraBold};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const Versus = styled.span`
  font-size: 3rem;
  font-weight: ${defaultTheme.fontWeight.weightExtraBold};
  color: #ff0000;
  text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2), 1px -1px 0 rgba(0, 0, 0, 0.2),
    -1px 1px 0 rgba(0, 0, 0, 0.2), 1px 1px 0 rgba(0, 0, 0, 0.2);
  margin-top: 3rem;
`;

// 10명이 될 때 색깔 바꾸기
const Result = styled.span<{ Win: string }>`
  font-size: 3rem;
  font-weight: ${defaultTheme.fontWeight.weightExtraBold};
  color: ${props => (props.Win ? '#0AD065' : '#F48080')};
  text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2), 1px -1px 0 rgba(0, 0, 0, 0.2),
    -1px 1px 0 rgba(0, 0, 0, 0.2), 1px 1px 0 rgba(0, 0, 0, 0.2);
  margin-top: 2.3rem;
`;

interface Prop {
  matchId: string;
  user1: string;
  user1Image: string;
  user2: string;
  user2Image: string;
  currentViewer: number;
  selectedGame: string;
}

export default function GameHistory({
  matchId,
  user1,
  user1Image,
  user2,
  user2Image,
  currentViewer,
  selectedGame,
}: Prop) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (selectedGame === '핑퐁핑퐁') {
      navigate(`/game/play/${matchId}`);
    }
  };

  return (
    <Base onClick={() => handleClick()}>
      <ProfileWrapper>
        <ProfileImage src={user1Image} alt={`${user1}의 이미지`} />
        <NickName>{user1}</NickName>
      </ProfileWrapper>
      <ContentWrapper>
        <Versus>VS</Versus>
        <Result Win="Win">{currentViewer}/10</Result>
      </ContentWrapper>
      <ProfileWrapper>
        <ProfileImage src={user2Image} alt={`${user2}의 이미지`} />
        <NickName>{user2}</NickName>
      </ProfileWrapper>
    </Base>
  );
}
