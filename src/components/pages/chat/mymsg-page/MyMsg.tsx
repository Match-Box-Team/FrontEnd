import React from 'react';
import Layout from '../../../commons/layout/Layout';
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';

export default function MyMsg() {
  return <div>mymsg</div>;
}

/*
    Header와 Footer를 넣었을 떄
    return (
    <Layout
      Header={<Header title="My Messages" channelToggle toggleMove={false} />}
      Footer={<Footer tab="channel" />}
    >
      <div>mymsg</div>
    </Layout>
  );
*/
