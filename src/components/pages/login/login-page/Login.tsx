import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../../commons/layout/Layout';
import LogoIcon from '../../../../assets/icon/logo.svg';
import LoginIcon from '../../../../assets/icon/login.svg';
import { userState } from '../../../../recoil/locals/login/atoms/atom';

export default function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const userInfo = useRecoilValue(userState);
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);

  const handleLogin = async () => {
    setIsLogin(!isLogin);

    await axios
      .get('http://localhost:3000/login')
      .then(function (response) {
        window.location.replace(response.data.url);
      })
      .catch(function (error) {
        if (error.response.status === 302) {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    if (userInfo.token !== '') {
      navigate('/chat/channel');
    }
  }, []);

  // 가짜 유저 로그인
  const fakeLogin = async (n: number) => {
    setIsLogin(!isLogin);
    await axios
      .get(`http://localhost:3000/auth/fakeLogin${n}`)
      .then(function (res) {
        const storeUser = {
          token: res.data.token,
          userId: res.data.userId,
          nickname: res.data.nickname,
          imageUrl: res.data.image,
        };
        console.log(storeUser);
        setUserState(storeUser);
        navigate('/chat/channel');
      })
      .catch(function (error) {
        if (error.response.status === 302) {
          console.log(error);
        }
      });
  };

  return (
    <Layout>
      <Fake1Button onClick={() => fakeLogin(1)}>가짜 유저1 로그인</Fake1Button>
      <Fake2Button onClick={() => fakeLogin(2)}>가짜 유저2 로그인</Fake2Button>
      <Container>
        <LogoImage src={LogoIcon} alt={LogoIcon} />
        <LoginImage src={LoginIcon} alt={LoginIcon} onClick={handleLogin} />
      </Container>
    </Layout>
  );
}

const LogoImage = styled.img`
  width: 15.653rem;
  height: 19.9rem;
`;

const LoginImage = styled.img`
  cursor: pointer;
  width: 15.653rem;
  height: 19.9rem;
`;

const Container = styled.div`
  display: flex;
  margin-top: 0;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 15rem 0rem 0rem;
  margin: 0;
  width: 100%;
  gap: 0;
  height: inherit;
  overflow-y: auto;
`;

const Fake1Button = styled.button`
  position: absolute;
  left: 40%;
  font-size: 20px;
`;

const Fake2Button = styled.button`
  position: absolute;
  left: 60%;
  font-size: 20px;
`;
