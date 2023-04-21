import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import styled from 'styled-components';
import { channelIdState } from '../../../../../recoil/locals/chat/atoms/atom';
import {
  ChatFormSubmitButton,
  ChatModalMainText,
  ModalContainer,
  XButton,
} from '../createroom-modal/Createroom';

// 모달 prop 타입
interface Props {
  isOpenInviteModal: boolean;
  handleClickModal: () => void;
}

// 모달 form input 타입
interface FormValues {
  nickname: string;
}

// 모달 form input 초기값
const initialFormValues: FormValues = {
  nickname: '',
};

export default function Invite({ isOpenInviteModal, handleClickModal }: Props) {
  // 채널 id atom getter
  const setChannelIdState = useRecoilValue(channelIdState);

  // form input 초기화
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  // form input 업데이트
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  // 채팅방 친구 초대 post
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // const response = await axios.get(
      // `http://localhost:3000/channels/${setChannelIdState}/invite?nickname=jinho`,
      const response = await axios.post(
        `http://localhost:3000/channels/${setChannelIdState}/invite`,
        {
          nickname: formValues.nickname,
        },
        {
          headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
        },
      );
      // form input 초기화
      setFormValues(initialFormValues);
      // 모달 끄기
      handleClickModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <OpenButton onClick={handleClickModal}>초대 모달 생성</OpenButton>;
      {isOpenInviteModal && (
        <ModalContainer>
          <XButton onClick={handleClickModal}>X</XButton>
          <ChatModalMainText>초대하기</ChatModalMainText>
          {/* <ChatFormSubmitButton type="submit">확인하기</ChatFormSubmitButton> */}
        </ModalContainer>
      )}
    </>
  );
}

export const OpenButton = styled.strong`
  position: absolute;
  top: 3rem;
  right: 0.3rem;
  font-size: 1.5rem;
  color: #c2c2c2;
  cursor: pointer;
  font-weight: bold;
`;
