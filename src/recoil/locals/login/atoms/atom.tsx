import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

const user = {
  token: '',
  userId: '',
  nickname: '',
  imageUrl: '',
};

export const userState = atom({
  key: 'userState',
  default: user,
  effects_UNSTABLE: [persistAtom],
});
