import React, { ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
import { userState } from '../../../../recoil/locals/login/atoms/atom';

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

  useEffect(() => {
    if (userInfo.token === '') {
      navigate('/');
    }
  }, [navigate, userInfo.token]);

  return <div>{children}</div>;
}
