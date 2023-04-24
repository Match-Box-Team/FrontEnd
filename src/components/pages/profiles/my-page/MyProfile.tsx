import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Layout from '../../../commons/layout/Layout';
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';
import EditMy from '../profile-modal/editmy-modal/EditMy';

interface User {
  userId: string;
  image: string;
  nickname: string;
  intraId: string;
  email: string;
  phoneNumber: string;
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
  // 모달 관리
  const [isOpenEditProfileModal, setIsOpenEditProfileModal] =
    useState<boolean>(false);
  const handleClickModal = () => {
    setIsOpenEditProfileModal(!isOpenEditProfileModal);
  };

  // 검색된 유저 이미지 초기화
  const [userImgaeUrl, setUserImageUrl] = useState<string>('');

  // 유저 정보 초기화
  const [user, setUser] = useState<User>(initailUserValues);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`http://localhost:3000/account`, {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
      });
      setUser(data.data.user);
      console.log(data.data.user);
      console.log(data.data.userGame);

      // 선택된 유저 이미지 get
      const imageUrl = await axios.get(
        `http://localhost:3000/account/image?userId=${data.data.user.userId}`,
        {
          responseType: 'blob',
          headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
        },
      );
      // 유저 이미지 저장
      setUserImageUrl(URL.createObjectURL(imageUrl.data));
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
        <UserProfileContainer>
          <UserImageWrap>
            <img src={userImgaeUrl} alt="검색된 유저 이미지" />
          </UserImageWrap>
          <UserCardWrap>
            <UserNameText>{user.nickname}</UserNameText>
            <UserNinknameText>{user.intraId}</UserNinknameText>
          </UserCardWrap>
          <EditProfileButton onClick={handleClickModal}>
            프로필 수정
          </EditProfileButton>
        </UserProfileContainer>
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
      </MyPageDiv>
    </Layout>
  );
}

const MyPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  // justify-content: center;
`;

/*
 ** 유저 프로필
 */
const UserProfileContainer = styled.div`
  padding: 20px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #d2d2d2;
`;

const UserImageWrap = styled.div`
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
  margin-left: 2.4rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserNameText = styled.p`
  margin: 10px 0px;
  align-self: flex-start;
  font-family: 'NanumGothic';
  font-size: 2.2rem;
  font-weight: bold;
`;

const UserNinknameText = styled.p`
  margin: 10px 0px;
  align-self: flex-start;
  font-family: 'NanumGothic';
  font-size: 2rem;
  color: #2d3648;
`;

const EditProfileButton = styled.button`
  font-family: 'NanumGothic';
  font-size: 2rem;
  margin-top: 1rem;
  width: 13rem;
  color: white;
  background: #6d77af;
  border-radius: 10px;
  border: 1px solid black;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 8px;
  margin-left: 4rem;
  cursor: pointer;
`;

/*
 ** 유저 정보
 */
const UserInfoContainer = styled.div`
  padding: 10px 0px;
  width: 88%;
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
  /* justify-content: center; */
  align-items: center;
  > p {
    margin: 0px 0px;
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
