import React from 'react';
import Layout from '../../../commons/layout/Layout';
import Header from '../../../commons/header/Header';
import Footer from '../../../commons/footer/Footer';

export default function ChatRoom() {
  return (
    <Layout>
      <div>ChatRoom</div>
    </Layout>
  );
}

/*
    Header와 Footer를 넣었을 떄
    return (
    <Layout
      Header={<Header title="Channel" channelBurger backPath="/chat/channel" />}
      Footer={<Footer tab="channel" />}
    >
      <div>Chatroom</div>
    </Layout>
  );
*/
