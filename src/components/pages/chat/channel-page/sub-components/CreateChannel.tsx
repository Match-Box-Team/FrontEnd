// CreateChannelModal.tsx

import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isModalOpenState } from '../../../../../recoil/locals/chat/atoms/atom';

// ... (Styled components declarations and customModalStyle)
const CloseModalButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const listWidth = `100%`;

const customModalStyle: Modal.Styles = {
  ...Modal.defaultStyles,
  content: {
    ...Modal.defaultStyles.content,
    width: '80%',
    maxWidth: '330px',
    height: '40%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    border: '1px solid #d8d8d8',
    borderRadius: '10px',
    padding: '2rem',
    boxSizing: 'border-box',
  },
};

interface CreateChannelModalProps {
  onRequestClose: () => void;
}

function CreateChannelModal({ onRequestClose }: CreateChannelModalProps) {
  const isOpen = useRecoilValue(isModalOpenState);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={customModalStyle}
    >
      <CloseModalButton onClick={onRequestClose}>&times;</CloseModalButton>
      {/* 모달 내용, 채널 생성 폼 */}
    </Modal>
  );
}

export default CreateChannelModal;
