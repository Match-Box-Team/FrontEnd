import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../../commons/layout/Layout';
import LogoIcon from '../../../../assets/icon/logo.svg';
import LoginIcon from '../../../../assets/icon/login.svg';

export default function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsLogin(!isLogin);

    await axios
      .get('http://localhost:3000/login')
      .then(function (response) {
        console.log(response.data.url);
        window.location.replace(response.data.url);
      })
      .catch(function (error) {
        if (error.response.status === 302) {
          console.log(error);
        }
      });
  };

  return (
    <Layout>
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
