import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import {
  ChatFormInfoText,
  ChatModalMainText,
  FormContainer,
  FormDiv,
  FormInput,
  FormSubmitButton,
  FormText,
  FormWarp,
} from '../createroom-modal/Createroom';
import { channelIdState } from '../../../../../recoil/locals/chat/atoms/atom';
import Popup, { XButton } from '../../../../commons/modals/popup-modal/Popup';

// 모달 prop 타입
interface Props {
  isOpenSetRoomModal: boolean;
  handleClickModal: () => void;
}

// 모달 form input 타입
interface FormValues {
  password: string;
}

// 모달 form input 초기값
const initialFormValues: FormValues = {
  password: '',
};

export default function SetRoom({
  isOpenSetRoomModal,
  handleClickModal,
}: Props) {
  // 채널 id atom getter
  const channelIdStateValue = useRecoilValue(channelIdState);

  // form input 초기화
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  // form input 업데이트
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  // 채팅방 설정 patch
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3000/channels/${channelIdStateValue}`,
        {
          password: formValues.password,
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
      <XButton onClick={handleClickModal}>채팅방 설정 모달 생성</XButton>;
      {isOpenSetRoomModal && (
        <Popup onClose={handleClickModal}>
          <ChatModalMainText>채팅방 설정</ChatModalMainText>
          <FormDiv>
            <FormWarp>
              <FormContainer onSubmit={handleSubmit}>
                <FormText>비밀번호 설정</FormText>
                <FormInput
                  type="text"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 설정합니다"
                />
                <ChatFormInfoText>
                  * 비밀번호는 다시 찾을 수 없으니 잘 기억해주세요
                </ChatFormInfoText>
                <FormSubmitButton type="submit">제출하기</FormSubmitButton>
              </FormContainer>
            </FormWarp>
          </FormDiv>
        </Popup>
      )}
    </>
  );
}
