import { atom } from 'recoil';

const user = {
  token: '',
  userId: '',
  nickname: '',
  imageUrl: '',
};

export const userState = atom({
  key: 'userState',
  default: user,
});
