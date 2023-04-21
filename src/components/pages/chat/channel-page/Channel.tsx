import React from 'react';
import Layout from '../../../commons/layout/Layout';
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';

export default function Channel() {
  return (
    <Layout>
      <div>Channel</div>
    </Layout>
  );
}

/*
    Header와 Footer를 넣었을 떄
    return (
    <Layout
      Header={<Header title="Channel" channelToggle toggleMove />}
      Footer={<Footer tab="channel" />}
    >
      <div>Channel</div>
    </Layout>
  );
*/
