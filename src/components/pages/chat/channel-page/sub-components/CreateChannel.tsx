import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { isModalOpenState } from '../../../../../recoil/locals/chat/atoms/atom';

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
  const [channelName, setChannelName] = useState('');
  const [password, setPassword] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = process.env.REACT_APP_TOKEN;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const data = {
      channelName,
      password: isPublic ? undefined : password,
      isPublic,
    };

    try {
      await axios.post('http://127.0.0.1:3000/channels', data, config);
      onRequestClose();
      window.location.reload(); // 채널 목록 갱신을 위해 페이지 새로고침
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={customModalStyle}
    >
      <form onSubmit={handleSubmit}>
        <CloseModalButton onClick={onRequestClose}>&times;</CloseModalButton>
        <div>
          <label htmlFor="channelName">
            채널 이름:
            <input
              type="text"
              id="channelName"
              name="channelName"
              value={channelName}
              onChange={event => setChannelName(event.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="isPublic">
            공개 여부:
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={isPublic}
              onChange={event => setIsPublic(event.target.checked)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            비밀번호:
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required={!isPublic}
            />
          </label>
        </div>
        <button type="submit">채널 생성</button>
        <CloseModalButton onClick={onRequestClose}>&times;</CloseModalButton>
      </form>
    </Modal>
  );
}

export default CreateChannelModal;
