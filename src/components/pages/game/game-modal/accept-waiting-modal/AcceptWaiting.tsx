import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { NoXPopup } from '../../../../commons/modals/popup-modal/Popup';

interface Props {
  handleClickModal: () => void;
}

export default function AcceptWaiting({ handleClickModal }: Props) {
  return (
    <NoXPopup onClose={handleClickModal}>
      <MainText>초대 수락 대기 중...</MainText>
      <CancelButton onClick={() => handleClickModal()}>취소</CancelButton>
    </NoXPopup>
  );
}

const MainText = styled.p`
  padding-top: 1rem;
  margin: 20px 0;
  color: #3f4d97;
  font-size: 2rem;
  font-weight: bold;
`;

const CancelButton = styled.button`
  font-family: 'NanumGothic';
  font-weight: 700;
  font-size: 1.2rem;
  align-self: center;
  width: 10rem;
  color: white;
  background: #313c7a;
  border-radius: 20px;
  border: none;
  margin-bottom: 10px;
  padding: 7px;
  cursor: pointer;
`;
