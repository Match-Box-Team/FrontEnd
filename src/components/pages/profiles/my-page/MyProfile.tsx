import React, { useState } from 'react';
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
  return (
    <Layout Header={<Header title="MyPage" />} Footer={<Footer tab="my" />}>
      <EditMy
        isOpenEditProfileModal={isOpenEditProfileModal}
        handleClickModal={handleClickModal}
      />
    </Layout>
  );
}
