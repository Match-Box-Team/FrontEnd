import axios from 'axios';
import { AxiosInstanceWithToken } from '.';

// 예시
export function getFriendList() {
  return AxiosInstanceWithToken.get(`/friends`);
}
