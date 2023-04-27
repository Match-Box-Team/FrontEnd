import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Layout from '../../../commons/layout/Layout';
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';
import EditMy from '../profile-modal/editmy-modal/EditMy';
import PingPongIcon from '../../../../assets/icon/pingpong.svg';
import SelectArrow from '../../../../assets/icon/SelectArrow.svg';
import { userState } from '../../../../recoil/locals/login/atoms/atom';

interface User {
  userId: string;
  image: string;
  nickname: string;
  intraId: string;
  email: string;
  phoneNumber: string;
}

interface UserGame {
  game: {
    gameId: string;
    name: string;
  };
  gameHistory: {
    winCount: number;
    loseCount: number;
  };
}

const initailUserValues = {
  userId: '',
  image: '',
  nickname: '',
  intraId: '',
  email: '',
  phoneNumber: '',
};

export default function MyProfile() {
  // 페이지 이동
  const navigate = useNavigate();

  // 유저  정보
  const userInfo = useRecoilValue(userState);

  // 모달 관리
  const [isOpenEditProfileModal, setIsOpenEditProfileModal] =
    useState<boolean>(false);
  const handleClickModal = () => {
    setIsOpenEditProfileModal(!isOpenEditProfileModal);
  };

  // 검색된 유저 이미지
  const [userImgaeUrl, setUserImageUrl] = useState<string>('');

  // 유저 정보
  const [user, setUser] = useState<User>(initailUserValues);

  // 유저 게임 정보들
  const [userGames, setUserGames] = useState<UserGame[] | null>(null);

  // 게임 선택 박스 상태
  const [selectedOpen, setSelectedOpen] = useState<boolean>(false);

  // 선택된 게임 -> 초기 게임 핑퐁핑퐁(0)
  const [selectedGame, setSelectedGame] = useState<string>('핑퐁핑퐁');
  const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGame(event.target.value);
  };

  const getUserGameHistoryText = (gameName: string) => {
    const selectedUserGame = userGames?.filter(
      userGame => userGame.game.name === gameName,
    );
    const history = selectedUserGame?.at(0)?.gameHistory;
    if (!history) {
      return '0승 0패';
    }
    return `${history.winCount}승 ${history.loseCount}패`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`http://localhost:3000/account`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setUser(data.data.user);
      setUserGames(data.data.userGame);
    };
    fetchData();
  }, []);

  return (
    <Layout Header={<Header title="MyPage" />} Footer={<Footer tab="my" />}>
      <EditMy
        isOpenEditProfileModal={isOpenEditProfileModal}
        handleClickModal={handleClickModal}
      />
      <MyPageDiv>
        {/* 유저 프로필 */}
        <UserProfileContainer>
          <UserImageWrap>
            <img src={userInfo.imageUrl} alt="유저 이미지" />
          </UserImageWrap>
          <UserCardWrap>
            <UserNameText>{userInfo.nickname}</UserNameText>
            <UserNinknameText>{user.intraId}</UserNinknameText>
          </UserCardWrap>
          <EditProfileButton onClick={handleClickModal}>
            프로필 수정
          </EditProfileButton>
        </UserProfileContainer>
        {/* 유저 정보 */}
        <UserInfoContainer>
          <UserInfoWrap>
            <UserInfoKey>
              <p>Email</p>
            </UserInfoKey>
            <UserInfoValue>
              <p>{user.email}</p>
            </UserInfoValue>
            <UserInfoKey>
              <p>Github</p>
            </UserInfoKey>
            <UserInfoValue>
              <p>https://github.com/Match-Box-Team</p>
            </UserInfoValue>
          </UserInfoWrap>
        </UserInfoContainer>
        {/* 게임 선택 */}
        <SelectGameContainer>
          <PingPongImageWrap>
            <img src={PingPongIcon} alt={PingPongIcon} />
          </PingPongImageWrap>
          <SelectContainer>
            <SelectWrapper>
              <Select
                name="game"
                onClick={() => {
                  setSelectedOpen(!selectedOpen);
                }}
                onChange={handleGameChange}
              >
                <option value="핑퐁핑퐁">핑퐁핑퐁</option>
                <option value="테트리스">테트리스</option>
                <option value="퍼즐팡팡">퍼즐팡팡</option>
                <option value="좀비좀비">좀비좀비</option>
              </Select>
              <ArrowIcon
                onClick={() => setSelectedOpen(!selectedOpen)}
                isOpen={selectedOpen}
              >
                <img src={SelectArrow} alt={SelectArrow} />
              </ArrowIcon>
            </SelectWrapper>
          </SelectContainer>
        </SelectGameContainer>
        <GameContainer>
          <HistoryText>{getUserGameHistoryText(selectedGame)}</HistoryText>
          <GameButton onClick={() => navigate('/game/record')}>
            전적 보기
          </GameButton>
          <GameButton>게임하기</GameButton>
        </GameContainer>
      </MyPageDiv>
    </Layout>
  );
}

// 전체 div
const MyPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

/*
 ** 유저 프로필
 */
const UserProfileContainer = styled.div`
  padding: 3rem 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #d2d2d2;
`;

const UserImageWrap = styled.div`
  margin-left: 2rem;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserCardWrap = styled.div`
  margin: 0px;
  margin-left: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserNameText = styled.p`
  margin: 10px 0px;
  width: 13rem;
  text-align: start;
  align-self: flex-start;
  font-family: 'NanumGothic';
  font-size: 2rem;
  font-weight: bold;
`;

const UserNinknameText = styled.p`
  margin: 5px 0px;
  text-align: start;
  align-self: flex-start;
  font-family: 'NanumGothic';
  font-size: 2rem;
  color: #2d3648;
`;

const EditProfileButton = styled.button`
  font-family: 'NanumGothic';
  font-size: 1.8rem;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 1rem;
  width: 13rem;
  color: white;
  background: #6d77af;
  border-radius: 10px;
  border: 1px solid black;
  cursor: pointer;
`;

/*
 ** 유저 정보
 */
const UserInfoContainer = styled.div`
  padding: 2rem 0px;
  width: 85%;
  display: flex;
  flex-direction: column;
`;

const UserInfoWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 6fr;
  grid-template-rows: 1fr 1fr;
`;

const UserInfoKey = styled.div`
  display: flex;
  align-items: center;
  > p {
    margin: 15px 0px;
    font-size: 1.8rem;
    color: #2d3648;
  }
`;

const UserInfoValue = styled.div`
  display: flex;
  align-items: center;
  > p {
    font-size: 1.4rem;
    color: #2d3648;
  }
`;

/*
 ** 게임 선택
 */
const SelectGameContainer = styled.div`
  background-color: #313c7a;
  border-radius: 20px;
  width: 85%;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const PingPongImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    width: 9rem;
    height: 9rem;
  }
`;

const SelectContainer = styled.div`
  width: 19rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  font-family: 'NanumGothic';
  font-size: 2.5rem;
  font-weight: bold;
  color: #555555;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 14px 10px;
  text-align: center;

  appearance: none;

  &:focus {
    outline: none;
  }

  option {
    width: 100%;
    font-family: 'NanumGothic';
    font-size: 2rem;
    color: #555555;
  }
`;

const ArrowIcon = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(0%)
    ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};

  > img {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

/*
 ** 게임
 */
const GameContainer = styled.div`
  margin-top: 2.5rem;
  background: #e1e3ee;
  border-radius: 10px;
  width: 85%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const HistoryText = styled.p`
  margin-top: 20px;
  margin-bottom: 15px;
  font-family: 'SEBANG Gothic';
  font-size: 4rem;
`;

const GameButton = styled.button`
  font-family: 'SEBANG Gothic';
  font-size: 4rem;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 1rem;
  width: 20rem;
  color: white;
  background: #6d77af;
  border-radius: 10px;
  border: 1px solid black;
  cursor: pointer;
`;
