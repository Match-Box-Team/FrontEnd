import styled from 'styled-components';
import { NoXPopup } from '../../../../commons/modals/popup-modal/Popup';
import { User } from '../../../login/login-page/CheckLogin';
import { ButtonsWrap, BuyButton } from '../buygame-modal/BuyGame';

interface Props {
  enemyInfo: User;
  handleClickModal: () => void;
}

export default function AcceptGameModal({
  enemyInfo,
  handleClickModal,
}: Props) {
  return (
    <NoXPopup onClose={handleClickModal}>
      <UserImageWrap>
        <img src={enemyInfo.image} alt="상대 유저 이미지" />
      </UserImageWrap>
      <MainText>{enemyInfo.nickname}의 핑퐁핑퐁 게임 신청</MainText>
      <ButtonsWrap>
        <BuyButton yes onClick={() => handleClickModal()}>
          수락
        </BuyButton>
        <BuyButton yes={false} onClick={() => handleClickModal()}>
          거절
        </BuyButton>
      </ButtonsWrap>
    </NoXPopup>
  );
}

const UserImageWrap = styled.div`
  margin-top: 30px;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MainText = styled.p`
  padding-top: 1rem;
  color: #3f4d97;
  font-size: 2rem;
  font-weight: bold;
`;
