import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Popup from '../../../../commons/modals/popup-modal/Popup';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl('');
    }
  };

  // nickname input 초기화
  const [nickname, setNickname] = useState<string>('');
  // nickname input 업데이트
  const handleNicknameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;
    setNickname(value);
  };

  useEffect(() => {
    setSelectedFile(null);
    setPreviewUrl('');
    setNickname('');
  }, [isOpenEditProfileModal]);

  // 프로필 수정 patch
  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // 이미지 업데이트
      if (selectedFile) {
        const form = new FormData();
        form.append('image', selectedFile!);
        const user = await axios.patch(
          `http://localhost:3000/account/image`,
          form,
          {
            headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
          },
        );
      }
      // 닉네임 업데이트
      if (nickname) {
        const user = await axios.patch(
          `http://localhost:3000/account/nickname`,
          {
            nickname,
          },
          {
            headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
          },
        );
      }
      // 모달 끄기
      handleClickModal();
    } catch (error) {
      alert('중복된 닉네임입니다');
    }
  };

  return (
    <div>
      {isOpenEditProfileModal && (
        <Popup onClose={handleClickModal}>
          <EditMyMainText>프로필 수정</EditMyMainText>
          <FormDiv>
            <FormWarp>
              <FormContainer onSubmit={handleEditSubmit}>
                {/* <SelectImageInput type="file" id="image-input" /> */}
                <input type="file" onChange={handleFileInputChange} />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ maxWidth: '100%' }}
                  />
                )}
                <FormText>닉네임 수정</FormText>
                <FormInput
                  type="text"
                  name="channelName"
                  value={nickname}
                  onChange={handleNicknameChange}
                  placeholder="닉네임을 수정합니다"
                />
                <FormSubmitButton type="submit">저장</FormSubmitButton>
              </FormContainer>
            </FormWarp>
          </FormDiv>
        </Popup>
      )}
    </div>
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
