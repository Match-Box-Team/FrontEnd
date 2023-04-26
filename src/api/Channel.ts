import axios from 'axios';
import { AxiosInstanceWithToken } from '.';

export function joinChannel(channelId: string) {
  return AxiosInstanceWithToken.post(`/channels/${channelId}/join`);
}

export function getChatRoomLog(channelId: string) {
  return AxiosInstanceWithToken.get(`/channels/${channelId}`);
}
