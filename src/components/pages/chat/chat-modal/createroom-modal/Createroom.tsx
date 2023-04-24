import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { channelIdState } from '../../../../../recoil/locals/chat/atoms/atom';
import { PublicToggleButton } from './PublicToggleButton';

interface Props {
  isOpenCreateRoomModal: boolean;
  handleClickModal: () => void;
}

interface FormValues {
  channelName: string;
  password: string;
}

const initialFormValues: FormValues = {
  channelName: '',
  password: '',
};

export default function CreateRoom({
  isOpenCreateRoomModal,
  handleClickModal,
}: Props) {
  const navigate = useNavigate();
  const setChannelIdState = useSetRecoilState(channelIdState);

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(`isPublic?: ${isPublic}`);
    // console.log(`channelName: ${formValues.channelName}`);
    // console.log(`password: ${formValues.password}`);
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
      setFormValues(initialFormValues);
      handleClickModal();
      setChannelIdState(response.data.channelId);
      const to = `/chat/channel/${response.data.channelId}`;
      // console.log(to);
      navigate(to);
    } catch (error) {
      console.log(error);
    }
  };

  const [isPublic, setIsPublic] = useState<boolean>(false);
  const handleClick = () => {
    setIsPublic(!isPublic);
  };

  return (
    <div>
      {isOpenCreateRoomModal && (
        <ModalContainer>
          <XButton onClick={handleClickModal}>&times;</XButton>
          <CreateChannelText>채널 만들기</CreateChannelText>
          <FormDiv>
            <FormWarp>
              <FormContainer onSubmit={handleSubmit}>
                <FormText>채팅방 이름</FormText>
                <FormInput
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
                <FormText>비밀번호 설정</FormText>
                <FormInput
                  type="text"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 설정합니다"
                />
                <FormInfoText>
                  * 비밀번호를 설정하지 않으려면 빈칸으로 두세요
                </FormInfoText>
                <FormInfoText>
                  * 비밀번호는 다시 찾을 수 없으니 잘 기억해주세요
                </FormInfoText>
                <CreateRoomSubmitButton type="submit">
                  제출하기
                </CreateRoomSubmitButton>
              </FormContainer>
            </FormWarp>
          </FormDiv>
        </ModalContainer>
      )}
    </div>
  );
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #ffffff;
  border-top: none;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);

  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const XButton = styled.strong`
  position: absolute;
  top: 0;
  right: 0.3rem;
  font-size: 2.5rem;
  color: #c2c2c2;
  cursor: pointer;
  font-weight: bold;
  margin: 1rem;
`;

const CreateChannelText = styled.p`
  padding-top: 1rem;
  font-size: 1.5rem;
  font-weight: bolder;
`;

const FormDiv = styled.div`
  border-radius: 1.6rem;
  background-color: #f4f4f4;
  width: 80%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormWarp = styled.div`
  padding: 0.7rem 0px;
  width: 87%;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormText = styled.p`
  font-size: 0.8rem;
  align-self: flex-start;
  padding-left: 0.2rem;
`;

const FormInput = styled.input`
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

const FormInfoText = styled.p`
  margin-top: 5px;
  color: #b5b1b1e1;
  align-self: flex-start;
  font-size: 0.1rem;
`;

const CreateRoomSubmitButton = styled.button`
  margin-top: 20px;
  align-self: center;
  width: 40%;
  color: white;
  background: #313c7a;
  border-radius: 20px;
`;
