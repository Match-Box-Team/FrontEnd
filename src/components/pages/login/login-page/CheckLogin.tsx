import React, { ReactNode, useEffect, useRef } from 'react';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
// import jwt from 'jsonwebtoken';
import { userState } from '../../../../recoil/locals/login/atoms/atom';
import { IError } from '../../chat/chatroom-page';

interface Props {
  children: ReactNode;
}

// const isTokenExpired = (token: string) => {
//   const decodedToken = jwt.decode(token);
//   console.log(decodedToken);
// };
// 토큰 만료 시 offline 요청, recoil 비워주기

export default function CheckLogin({ children }: Props) {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const setUserState = useSetRecoilState(userState);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (userInfo.token === '') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (userInfo.token !== '' && socketRef.current === null) {
      socketRef.current = io(`${process.env.REACT_APP_BASE_BACKEND_URL}`, {
        path: '/socket.io',
        extraHeaders: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      socketRef.current.emit('login');
      socketRef.current.on('error', (error: IError) => {
        console.log(error);
        navigate('/');
      });
    }
    return () => {
      if (userInfo.token !== '' && socketRef.current === null) {
        const resetUser = {
          token: '',
          userId: '',
          nickname: '',
          imageUrl: '',
        };
        setUserState(resetUser);
      }
    };
  }, [socketRef.current]);
  return <div>{children}</div>;
}
