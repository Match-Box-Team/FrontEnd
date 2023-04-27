import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { NoXPopup } from '../../../../commons/modals/popup-modal/Popup';
import { userState } from '../../../../../recoil/locals/login/atoms/atom';

interface Props {
  isOpenBuyGameModal: boolean;
  handleClickModal: () => void;
  gameId: string;
}

interface ButtonProps {
  yes: boolean;
}

export default function BuyGame({
  isOpenBuyGameModal,
  handleClickModal,
  gameId,
}: Props) {
  // 유저  정보
  const userInfo = useRecoilValue(userState);

  // 게임 구매
  const handleBuyGame = () => {
    const buyGame = async () => {
      const data = await axios.post(
        `http://localhost:3000/games/${gameId}/buy`,
        null,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        },
      );
    };
    buyGame();
    handleClickModal();
    window.location.reload();
  };
  return (
    <div>
      {isOpenBuyGameModal && (
        <NoXPopup onClose={handleClickModal}>
          <MainText>정말로 구매하시겠습니까</MainText>
          <ButtonsWrap>
            <BuyButton yes onClick={() => handleBuyGame()}>
              네
            </BuyButton>
            <BuyButton yes={false} onClick={() => handleClickModal()}>
              아니오
            </BuyButton>
          </ButtonsWrap>
        </NoXPopup>
      )}
    </div>
  );
}

const MainText = styled.p`
  margin: 30px 0px;
  color: black;
  font-size: 1.8rem;
  font-weight: bolder;
  width: 20rem;
`;

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 18rem;
  align-items: center;
  justify-content: space-between;
`;

const BuyButton = styled.button<ButtonProps>`
  font-family: 'NanumGothic';
  font-size: 1.4rem;
  font-weight: bold;
  align-self: center;
  width: 7rem;
  color: white;
  background-color: ${({ yes }) => (yes ? '#da0d00' : '#313c7a')};
  border-radius: 10px;
  border: none;
  margin-bottom: 20px;
  padding: 7px;
  cursor: pointer;
`;
