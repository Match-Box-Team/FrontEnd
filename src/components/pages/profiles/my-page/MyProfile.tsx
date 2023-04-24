import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../../commons/layout/Layout';
import Footer from '../../../commons/footer/Footer';
import Header from '../../../commons/header/Header';
import EditMy from '../profile-modal/editmy-modal/EditMy';

export default function MyProfile() {
  const [isOpenEditProfileModal, setIsOpenEditProfileModal] =
    useState<boolean>(false);
  const handleClickModal = () => {
    setIsOpenEditProfileModal(!isOpenEditProfileModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`http://localhost:3000/account`, {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` },
      });
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <Layout Header={<Header title="MyPage" />} Footer={<Footer tab="my" />}>
      <EditMy
        isOpenEditProfileModal={isOpenEditProfileModal}
        handleClickModal={handleClickModal}
      />
    </Layout>
  );
}
