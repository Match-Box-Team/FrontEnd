import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { channelIdState } from '../../../../../recoil/locals/chat/atoms/atom';
import { PublicToggleButton } from './PublicToggleButton';
import Popup, { XButton } from '../../../../commons/modals/popup-modal/Popup';

// 모달 prop 타입
interface Props {
  isOpenCreateRoomModal: boolean;
  handleClickModal: () => void;
}

// 모달 form input 타입
interface FormValues {
  channelName: string;
  password: string;
}

// 모달 form input 초기값
const initialFormValues: FormValues = {
  channelName: '',
  password: '',
};

// 채팅방 생성 모달
export default function CreateRoom({
  isOpenCreateRoomModal,
  handleClickModal,
}: Props) {
  // 페이지 이동
  const navigate = useNavigate();
  // 채널 id atom setter
  const setChannelIdState = useSetRecoilState(channelIdState);

  // form input 초기화
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  // form input 업데이트
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };
  // 토글 상태 관리
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const handleClick = () => {
    setIsPublic(!isPublic);
  };

  // 채팅방 생성 Post
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/channels',
        {
          channelName: formValues.channelName,
          password: formValues.password,
          isPublic,
        },
        {
          headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
        },
      );
      // form input 초기화
      setFormValues(initialFormValues);
      // 모달 끄기
      handleClickModal();
      // 채널 id 설정
      setChannelIdState(response.data.channelId);
      // 채팅방으로 페이지 이동
      const to = `/chat/channel/${response.data.channelId}`;
      navigate(to);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <XButton onClick={handleClickModal}>모달 생성</XButton>
      {isOpenCreateRoomModal && (
        <Popup onClose={handleClickModal}>
          <ChatModalMainText>채널 만들기</ChatModalMainText>
          <ChatFormDiv>
            <ChatFormWarp>
              <ChatFormContainer onSubmit={handleSubmit}>
                <ChatFormText>채팅방 이름</ChatFormText>
                <ChatFormInput
                  type="text"
                  name="channelName"
                  value={formValues.channelName}
                  onChange={handleChange}
                  placeholder="채팅방 이름을 설정합니다"
                  required
                />
                <RoomTypeContainer>
                  <RoomTypeText>공개/비공개</RoomTypeText>
                  <PublicToggleButton
                    isPublic={isPublic}
                    onClick={handleClick}
                    type="button"
                  />
                </RoomTypeContainer>
                <ChatFormText>비밀번호 설정</ChatFormText>
                <ChatFormInput
                  type="text"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 설정합니다"
                />
                <ChatFormInfoText>
                  * 비밀번호를 설정하지 않으려면 빈칸으로 두세요
                </ChatFormInfoText>
                <ChatFormInfoText>
                  * 비밀번호는 다시 찾을 수 없으니 잘 기억해주세요
                </ChatFormInfoText>
                <ChatFormSubmitButton type="submit">
                  제출하기
                </ChatFormSubmitButton>
              </ChatFormContainer>
            </ChatFormWarp>
          </ChatFormDiv>
        </Popup>
      )}
    </div>
  );
}

export const ChatModalMainText = styled.p`
  padding-top: 1rem;
  font-size: 1.5rem;
  font-weight: bolder;
`;

export const ChatFormDiv = styled.div`
  border-radius: 1.6rem;
  background-color: #f4f4f4;
  width: 80%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ChatFormWarp = styled.div`
  padding: 0.7rem 0px;
  width: 87%;
`;

export const ChatFormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ChatFormText = styled.p`
  font-size: 0.8rem;
  align-self: flex-start;
  padding-left: 0.2rem;
`;

export const ChatFormInput = styled.input`
  font-size: 0.8rem;
  align-self: flex-start;
  border: 1px solid #f4f4f4;
  border-radius: 8px;
  width: 100%;
`;

const RoomTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RoomTypeText = styled.p`
  font-size: 0.8rem;
  align-self: flex-start;
  margin-bottom: 0;
  padding-left: 0.2rem;
  padding-right: 1.5rem;
`;

export const ChatFormInfoText = styled.p`
  margin-top: 5px;
  color: #b5b1b1e1;
  align-self: flex-start;
  font-size: 0.1rem;
`;

export const ChatFormSubmitButton = styled.button`
  font-family: 'NanumGothic';
  margin-top: 1rem;
  align-self: center;
  width: 8rem;
  color: white;
  background: #313c7a;
  border-radius: 20px;
  margin-bottom: 10px;
`;
