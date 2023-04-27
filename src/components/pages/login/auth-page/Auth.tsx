import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../../../recoil/locals/login/atoms/atom';
import Layout from '../../../commons/layout/Layout';
import Header from '../../../commons/header/Header';
import { getImageUrl } from '../../../../api/ProfileImge';

export default function Auth() {
  // 페이지 이동
  const navigate = useNavigate();
  // 타이머
  const [time, setTime] = useState(300);
  // 입력
  const [inputValue, setInputValue] = useState('');
  // recoil 유저 토큰 저장
  const setUserState = useSetRecoilState(userState);
  const userInfo = useRecoilValue(userState);
  // 쿠키
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // 입력 변화 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  // confirm 버튼 클릭 핸들러
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      // 인증 코드 검증
      const userIdInCookie = cookies.token;
      const response = await axios.post(
        `http://localhost:3000/auth/verifyCode`,
        {
          userId: userIdInCookie,
          code: inputValue,
        },
      );
      const jwtToken = response.data.token;
      // 유저 정보 저장
      const userInfoResponse = await axios.post(
        `http://localhost:3000/account/info`,
        {
          userId: userIdInCookie,
        },
      );
      // 유저 이미지 저장
      const userImage = await getImageUrl(userIdInCookie, jwtToken);
      const storeUser = {
        token: jwtToken,
        userId: userIdInCookie,
        nickname: userInfoResponse.data.nickname,
        imageUrl: userImage,
      };
      console.log(storeUser);
      removeCookie('token');
      setUserState(storeUser);
      navigate(`/chat/channel`);
    } catch (error) {
      alert('틀린 인증 코드입니다. 다시 로그인해주세요.');
      console.log(error);
      removeCookie('token');
      navigate(`/`);
    }
  };

  useEffect(() => {
    if (cookies.token === undefined) {
      if (userInfo.token === '') {
        navigate('/');
      } else {
        navigate('/chat/channel');
      }
    }
  }, []);

  // 타이머
  useEffect(() => {
    async function verifyTimeOut() {
      await axios
        .post(`http://localhost:3000/auth/verifyTimeOut`, {
          userId: cookies.token,
        })
        .then(function (response) {
          console.log('success verifyTimeOut');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    let timerId: any;

    if (time > 0) {
      timerId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else {
      verifyTimeOut();
      alert('시간이 지났습니다. 다시 로그인해주세요.');
      removeCookie('token');
      navigate(`/`);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [time]);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <Layout Header={<Header title="Email Authentication Code" />}>
      <Container>
        <InfoText>인트라 이메일로 인증코드를 발송하였습니다</InfoText>
        <InputContainer>
          <Input
            type="text"
            placeholder="Code"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Timer>
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </Timer>
        </InputContainer>
        <FormSubmitButton onClick={handleClick}>Confirm</FormSubmitButton>
      </Container>
    </Layout>
  );
}

export const InfoText = styled.p`
  font-family: 'NanumGothic';
  font-weight: 400;
  font-size: 1.6rem;
`;

export const FormSubmitButton = styled.button`
  font-family: 'NanumGothic';
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 1rem;
  align-self: center;
  width: 10rem;
  color: white;
  background: #313c7a;
  border-radius: 20px;
  border: none;
  margin-bottom: 10px;
  padding: 7px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  margin-top: 0;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  list-style-type: none;
  padding: 50% 0rem 0rem;
  margin: 0;
  width: 100%;
  gap: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid black;

  &:focus {
    outline: none;
  }
`;

const Timer = styled.span`
  font-family: 'NanumGothic';
  font-size: 1.2rem;
  margin-left: 10px;
`;
