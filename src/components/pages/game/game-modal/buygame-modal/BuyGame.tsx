import React from 'react';
import styled from 'styled-components';
import { NoXPopup } from '../../../../commons/modals/popup-modal/Popup';

interface Props {
  isOpenBuyGameModal: boolean;
  handleClickModal: () => void;
}

interface ButtonProps {
  yes: boolean;
}

export default function BuyGame({
  isOpenBuyGameModal,
  handleClickModal,
}: Props) {
  return (
    <div>
      {isOpenBuyGameModal && (
        <NoXPopup onClose={handleClickModal}>
          <MainText>정말로 구매하시겠습니까</MainText>
          <BuyButton yes>네</BuyButton>
          <BuyButton yes={false}>아니오</BuyButton>
        </NoXPopup>
      )}
    </div>
  );
}

const MainText = styled.p`
  padding-top: 1rem;
  font-size: 2rem;
`;

export const BuyButton = styled.button<ButtonProps>`
  font-family: 'NanumGothic';
  font-weight: bold;
  margin-top: 1rem;
  align-self: center;
  width: 7rem;
  color: white;
  ${({ yes }) => {
    if (yes) {
      return `background: #da0d00`;
    }
    return `background: #313c7a`;
  }}
  border-radius: 10px;
  border: none;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 7px;
  cursor: pointer;
`;
