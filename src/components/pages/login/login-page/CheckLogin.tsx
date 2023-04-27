import React, { ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../../../recoil/locals/login/atoms/atom';

interface Props {
  children: ReactNode;
}

export default function CheckLogin({ children }: Props) {
  const navigate = useNavigate();
  const token = useRecoilValue(userState);

  useEffect(() => {
    if (token.token === '') {
      navigate('/');
    }
  }, [navigate, token]);

  return <div>{children}</div>;
}
