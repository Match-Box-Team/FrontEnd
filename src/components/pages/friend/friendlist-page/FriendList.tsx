import React, { useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../../../commons/layout/Layout';
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';
import MyProfile from './components/MyProfile';
import AddFriends from './components/AddFriends';
import FriendDetail from './components/FrinedDetail';

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
  return (
    <Layout
      Header={<Header title="Friends" friendToggle toggleMove />}
      Footer={<Footer tab="friend" />}
    >
      <Base>
        <Container>
          <MyProfile />
          <AddFriends />
        </Container>
        <FriendDetail />
      </Base>
    </Layout>
  );
}
