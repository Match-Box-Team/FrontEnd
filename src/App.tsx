import React from 'react';
import Layout from './components/commons/layout/Layout';

function App() {
  return (
    <Layout>
      <div>Hello, this is the main content!</div>
    </Layout>

    /* 레이아웃 헤더 푸터 사용 예시
    <Layout Header={<Header />} Footer={<Footer />}>
      <div>Hello, this is the main content!</div>
    </Layout>
    */
  );
}

export default App;
