import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
import { userState } from '../../../../../recoil/locals/login/atoms/atom';
import Invite from '../invite-modal/Invite';
import SetRoom from '../setroom-modal/SetRoom';
import What from '../../../../../assets/icon/what.svg';
import Plus from '../../../../../assets/icon/plus.svg';
import { toBase64 } from '../../../../../api/ProfileImge';
import Profile from '../../../../commons/modals/profile-modal/Profile';

// 모달 prop 타입
interface Props {
  isOpenSideModal: boolean;
  handleClickModal: () => void;
}

interface MuteKickProps {
  isAdmin: boolean;
  isMute: boolean;
}

interface Member {
  userId: string;
  intraId: string;
  nickname: string;
  image: string;
  muteKick: MuteKickProps;
}

// 채팅방 멤버 state 초기값
const initialMember: Member = {
  userId: '',
  intraId: '',
  nickname: '',
  image: '',
  muteKick: {
    isAdmin: false,
    isMute: false,
  },
};

export default function RoomSide({ isOpenSideModal, handleClickModal }: Props) {
  // 유저  정보
  const userInfo = useRecoilValue(userState);
  const testUserList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  // 채팅방 설정 모달
  const [isOpenSetRoomModal, setIsOpenSetRoomModal] = useState<boolean>(false);
  const handleClickSetRoomModal = () => {
    setIsOpenSetRoomModal(!isOpenSetRoomModal);
  };

  // 친구 초대 모달
  const [isOpenInviteModal, setIsOpenInviteModal] = useState<boolean>(false);
  const handleClickSetInviteModal = () => {
    setIsOpenInviteModal(!isOpenInviteModal);
  };

  // 친구 프로필 모달 예시
  const member: Member = {
    userId: '4b72d640-9998-4fbb-96bd-2c9463b550f1',
    intraId: 'jinhokim',
    nickname: 'jinhokim',
    image: '',
    muteKick: {
      isAdmin: true,
      isMute: true,
    },
  };

  const [isOpenProfileModal, setIsOpenProfileModal] = useState<boolean>(false);
  const handleClickSetProfileModal = async () => {
    setIsOpenProfileModal(!isOpenProfileModal);
  };

  const [selectedUser, setSelectedUser] = useState<Member>(initialMember);
  const handleGameSelect = async () => {
    console.log(member);
    const imageUrl = await axios.get(
      `http://localhost:3000/account/image?userId=${member.userId}`,
      {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${userInfo.token}` },
      },
    );
    console.log(imageUrl);
    member.image = await toBase64(imageUrl.data);
    setSelectedUser(member);
    setIsOpenProfileModal(true);
  };

  const handleAddFriend = async (userId: string) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/friends',
        {
          userId: 'de9b5226-d4ec-49e8-9257-056998f63fc0',
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SetRoom
        isOpenSetRoomModal={isOpenSetRoomModal}
        handleClickModal={handleClickSetRoomModal}
      />
      <Invite
        isOpenInviteModal={isOpenInviteModal}
        handleClickModal={handleClickSetInviteModal}
      />
      {isOpenProfileModal && selectedUser && (
        <Profile
          handleClickModal={handleClickSetProfileModal}
          user={selectedUser}
          inChat
        />
      )}
      {isOpenSideModal && (
        <ModalOutside onClick={() => handleClickModal()}>
          <SideModalDiv onClick={e => e.stopPropagation()}>
            <Header>
              <p># 설정</p>
            </Header>
            <Text onClick={handleClickSetRoomModal}>채팅방 설정</Text>
            <Hr />
            <Text onClick={handleClickSetInviteModal}>초대하기</Text>
            <Header>
              <p># 대화상대</p>
            </Header>
            <div>
              {testUserList.map(user => {
                return (
                  // onClickCapture로 부모 컴포넌트 이벤트 먼저 돌게함
                  // 아래는 유저 선택 이벤트가 동작해야함
                  <UserListContainer
                    key={user}
                    onClickCapture={handleGameSelect}
                  >
                    {/* <UserListContainer key={user}> */}
                    <UserImageWrap onClick={() => handleClickSetProfileModal()}>
                      <img src={userInfo.imageUrl} alt={userInfo.imageUrl} />
                    </UserImageWrap>
                    <p>{userInfo.nickname}</p>
                    <IconWrap>
                      <img src={What} alt={What} />
                    </IconWrap>
                    <IconWrap onClick={() => handleAddFriend(userInfo.userId)}>
                      <img src={Plus} alt={Plus} />
                    </IconWrap>
                    <Hr />
                  </UserListContainer>
                );
              })}
            </div>
          </SideModalDiv>
        </ModalOutside>
      )}
    </div>
  );
}

const ModalOutside = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 100%;
  max-width: 412px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const SideModalDiv = styled.div`
  position: fixed;
  top: 0%;
  left: 50%;
  width: 50%;
  height: 100%;
  max-width: 206px;
  background-color: white;
  overflow-y: auto;
  z-index: 200;
`;

const Header = styled.div`
  background: #313c7a;
  padding: 8px 0;
  > p {
    font-family: 'SEBANG Gothic';
    margin: 0;
    margin-left: 10px;
    color: white;
    font-weight: bold;
    font-size: 2rem;
    text-align: left;
  }
`;

const Text = styled.p`
  color: #2d3648;
  margin: 0px;
  padding: 10px 0;
  padding-left: 12px;
  text-align: left;
  font-size: 2rem;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 0;
  color: #c2c2c2;
`;

const UserListContainer = styled.div`
  padding: 0 7px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  > p {
    margin: 0px;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const UserImageWrap = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const IconWrap = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;
