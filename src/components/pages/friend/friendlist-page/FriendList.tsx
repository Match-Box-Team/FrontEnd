import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../../../commons/layout/Layout';
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';
import MyProfile from './components/MyProfile';
import AddFriends from './components/AddFriends';
import FriendDetail from './components/FrinedDetail';
import AddFriend from '../addfriend-modal/AddFriend';

const Base = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.8rem;
  align-items: start;
  padding: 0 2.4rem;
`;

export default function FriendList() {
  const [isAddFriendModal, setIsAddFriendModal] = useState<boolean>(false);
  const handleClickModal = () => {
    setIsAddFriendModal(!isAddFriendModal);
  };

  return (
    <Layout
      Header={<Header title="Friends" friendToggle toggleMove />}
      Footer={<Footer tab="friend" />}
    >
      <AddFriend
        isAddFriendModal={isAddFriendModal}
        handleClickModal={handleClickModal}
      />
      <Base>
        <Container>
          <MyProfile />
          <AddFriends handleClickModal={handleClickModal} />
        </Container>
        <FriendDetail />
      </Base>
    </Layout>
  );
}
