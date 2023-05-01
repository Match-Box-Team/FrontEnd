import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../../recoil/locals/login/atoms/atom';
import defaultTheme from '../../../../../styles/theme';

const Base = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const NickName = styled.span`
  font-size: 1.8rem;
  font-weight: ${defaultTheme.fontWeight.weightBold};
  margin-left: 1rem;
`;

export default function MyProfile() {
  const userInfo = useRecoilValue(userState);

  return (
    <Base>
      <ProfileImage
        src={userInfo.imageUrl}
        alt={`${userInfo.nickname}의 이미지`}
      />
      <NickName>{userInfo.nickname}</NickName>
    </Base>
  );
}
