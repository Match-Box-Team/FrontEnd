import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Popup, { XButton } from '../../../../commons/modals/popup-modal/Popup';
import {
  FormContainer,
  FormDiv,
  FormInput,
  FormSubmitButton,
  FormText,
  FormWarp,
} from '../../../chat/chat-modal/createroom-modal/Createroom';

// 모달 prop 타입
interface Props {
  isOpenEditProfileModal: boolean;
  handleClickModal: () => void;
}

export default function EditMy({
  isOpenEditProfileModal,
  handleClickModal,
}: Props) {
  // 선택된 이미지 초기화
  const [selectedImage, setSelectedImage] = useState<string>('');

  // nickname input 초기화
  const [Nickname, setNickname] = useState<string>('');
  // nickname input 업데이트
  const handleNicknameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;
    setNickname(value);
  };

  return (
    <>
      <XButton onClick={handleClickModal}>초대 모달 생성</XButton>;
      {isOpenEditProfileModal && (
        <Popup onClose={handleClickModal}>
          <EditMyMainText>프로필 수정</EditMyMainText>
          <FormDiv>
            <FormWarp>
              {/* <FormContainer onSubmit={handleSubmit}> */}
              <FormContainer>
                <SelectImageInput type="file" id="image-input" />
                <FormText>닉네임 수정</FormText>
                <FormInput
                  type="text"
                  name="channelName"
                  value={Nickname}
                  onChange={handleNicknameChange}
                  placeholder="닉네임을 수정합니다"
                  required
                />
                <FormSubmitButton type="submit">저장</FormSubmitButton>
              </FormContainer>
            </FormWarp>
          </FormDiv>
        </Popup>
      )}
    </>
  );
}

const EditMyMainText = styled.p`
  padding-top: 1rem;
  color: #3f4d97;
  font-size: 2rem;
  font-weight: bold;
`;

const SelectImageInput = styled.input`
  font-family: 'NanumGothic';
  align-self: center;
  width: 8rem;
  color: white;
  background: #6d77af;
  border-radius: 20px;
  border: none;
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
`;

const InputFile = styled.input`
  font-family: 'NanumGothic';
  align-self: center;
  width: 8rem;
  color: white;
  background: #6d77af;
  border-radius: 20px;
  border: none;
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
`;
