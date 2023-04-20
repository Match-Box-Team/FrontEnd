import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Layout from '../../../commons/layout/Layout';

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #3ab5c5;
`;

export default function Channel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = process.env.REACT_APP_TOKEN;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get(
          'http://127.0.0.1:3000/channels',
          config,
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <List>
        <h1>Channel</h1>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading data...</p>
        )}
        <h2>hello</h2>
      </List>
    </Layout>
  );
}

/*
    Header와 Footer를 넣었을 떄
    <Layout Header={<Header/> Footer={<Footer>}}>
    {Contents}
    </Layout>);
  */
