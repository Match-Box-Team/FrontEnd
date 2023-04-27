import axios, { AxiosResponse } from 'axios';

export const getImageUrl = async (
  userId: string,
  token: string,
): Promise<string> => {
  const response: AxiosResponse<Blob> = await axios.get(
    `http://localhost:3000/account/image?userId=${userId}`,
    {
      responseType: 'blob',
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const imageUrl: string = URL.createObjectURL(response.data);
  return imageUrl;
};
