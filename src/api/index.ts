import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_BACKEND_URL,
  withCredentials: true,
});

const AxiosInstanceWithToken = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: 'Bearer 이 자리를 토큰으로 교체하세요',
  },
  // 아직 토큰을 저장하는 로직이 안 만들어져서 일단 주석처리
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('jwt')}`,
});

export { AxiosInstance, AxiosInstanceWithToken };