import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../commons/layout/Layout';
import ReadyGame from '../../game/game-modal/readygame-modal/ReadyGame';

export default function FriendProfile() {
  const [showReadyGameModal, setShowReadyGameModal] = useState(false);

  const handleButtonClick = () => {
    setShowReadyGameModal(true);
  };

  const handleCloseModal = () => {
    setShowReadyGameModal(false);
  };

  return (
    <Layout>
      <button type="button" onClick={handleButtonClick}>
        Ready Game
      </button>
      {showReadyGameModal && <ReadyGame onClick={handleCloseModal} />}
    </Layout>
  );
}
