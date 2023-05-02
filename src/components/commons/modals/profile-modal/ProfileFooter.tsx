import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { BlobOptions } from 'buffer';
import { channelIdState } from '../../../../recoil/locals/chat/atoms/atom';
import BanIcon from '../../../../assets/icon/ban.svg';
import NotBanIcon from '../../../../assets/icon/not-ban.svg';
import DmIcon from '../../../../assets/icon/dm.svg';
import GameIcon from '../../../../assets/icon/game.svg';
import KickIcon from '../../../../assets/icon/kick.svg';
import MuteIcon from '../../../../assets/icon/mute.svg';
import UnmuteIcon from '../../../../assets/icon/unmute.svg';
import { userState } from '../../../../recoil/locals/login/atoms/atom';

interface BanProps {
  friendId: string;
  isBan: boolean;
}

interface MuteKickProps {
  isAdmin: boolean;
  isMute: boolean;
}

interface UserProps {
  userId: string;
  muteKick?: MuteKickProps;
  ban?: BanProps;
}

interface Props {
  handleClickModal: () => void;
  user: UserProps;
  inChat: boolean;
}

export default function ProfileFooter({
  handleClickModal,
  user,
  inChat,
}: Props) {
  // 리액트 쿼리
  const queryClient = useQueryClient();
  // 페이지 이동
  const navigate = useNavigate();
  // 리코일 - 채널 id atom getter
  const channelIdStateValue = useRecoilValue(channelIdState);
  const userInfo = useRecoilValue(userState);
  // 음소거 유무
  const [isMute, setIsMute] = useState<boolean | undefined>(
    user.muteKick?.isMute,
  );
  // 차단 유무
  // const [isBan, setIsBan] = useState<boolean | undefined>(user.ban?.isBan);
  // 음소거와 킥 공통 url
  const muteKickUrl = `http://localhost:3000/channels/${channelIdStateValue}/member/${user.userId}`;

  // 음소거 설정 버튼 클릭
  const handleMuteClicked = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    await axios
      .patch(muteKickUrl.concat(isMute ? `/unmute` : `/mute`), null, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(function (response) {
        // 음소거 상태 변화
        setIsMute(!isMute);
      })
      .catch(function (error) {
        // 예외 처리
        if (error.response.status === 404) {
          alert('없는 사용자입니다');
        } else if (error.response.status === 403) {
          if (error.response.data.message === 'not admin user') {
            alert('사용자가 오너이거나 관리자가 아닙니다');
          } else if (error.response.data.message === 'cannot mute owner') {
            alert('채널 소유자를 음소거할 수 없습니다');
          }
        } else {
          alert(error);
        }
      });
  };

  // 킥 버튼 클릭
  const handleKickClicked = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    await axios
      .delete(muteKickUrl, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // 예외 처리
        if (error.response.status === 400) {
          alert(error.response.data.message);
        } else if (error.response.status === 404) {
          alert('없는 사용자입니다');
        } else {
          alert(error);
        }
      });
    // 프로필 모달 닫기
    handleClickModal();
  };

  // 차단 버튼 클릭
  const handleBanClicked = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    await axios
      .patch(
        `http://localhost:3000/friends/${user.ban?.friendId}/banned`,
        {
          isBan: true,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(function (response) {
        // 프로필 모달 닫기
        handleClickModal();

        // 친구 목록 쿼리 무효화 및 재요청
        queryClient.invalidateQueries('friends');
      })
      .catch(function (error) {
        // 예외 처리
        if (error.response.status === 404) {
          alert('사용자의 친구가 아닙니다');
        } else if (error.response.status === 409) {
          alert('이미 차단되거나 차단 해제된 사용자입니다');
        } else {
          alert(error);
        }
      });
  };

  // 디엠 버튼 클릭
  const handleDmClicked = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    await axios
      .post(
        `http://localhost:3000/channels/dm`,
        {
          buddyId: user.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(function (response) {
        const to = `/chat/channel/${response.data.channel.channelId}`;
        // 리코일 추가
        navigate(to);
      })
      .catch(function (error) {
        // 예외 처리
        if (error.response.status === 404) {
          alert('없는 사용자입니다');
        } else {
          alert(error);
        }
      });
    // 프로필 모달 닫기
    handleClickModal();
  };

  // 게임 샵으로 이동
  const handleGameClicked = () => {
    // 프로필 모달 닫기
    handleClickModal();
    navigate(`/profile/friend/${user.userId}`);
  };

  const onlyOne = !(inChat && user.muteKick?.isAdmin) && inChat;

  return (
    <FooterWrapper onlyOne={onlyOne}>
      <ButtonWrap>
        <Button onClick={handleGameClicked}>
          <ButtonImage src={GameIcon} />
        </Button>
      </ButtonWrap>{' '}
      {inChat && user.muteKick?.isAdmin && (
        <>
          <ButtonWrap>
            <Button onClick={handleMuteClicked}>
              <ButtonImage src={isMute ? MuteIcon : UnmuteIcon} />
            </Button>
          </ButtonWrap>
          <ButtonWrap>
            <Button onClick={handleKickClicked}>
              <ButtonImage src={KickIcon} />
            </Button>
          </ButtonWrap>
        </>
      )}
      {!inChat && (
        <>
          <ButtonWrap>
            <Button onClick={handleDmClicked}>
              <ButtonImage src={DmIcon} />
            </Button>
          </ButtonWrap>
          <ButtonWrap>
            <Button onClick={handleBanClicked}>
              <ButtonImage src={BanIcon} />
            </Button>
          </ButtonWrap>
        </>
      )}
    </FooterWrapper>
  );
}

const ButtonImage = styled.img`
  width: 7rem;
  height: 7rem;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const FooterWrapper = styled.footer<{ onlyOne: boolean }>`
  /* padding: 3rem 2rem 0.8rem; */
  /* bottom: 0rem; */
  /* top: 80rem; */
  border-top: 1px solid #d3d3d3;
  display: grid;
  grid-template-columns: ${({ onlyOne }) => (onlyOne ? '1fr' : '1fr 1fr 1fr')};
  width: 100%;
`;
