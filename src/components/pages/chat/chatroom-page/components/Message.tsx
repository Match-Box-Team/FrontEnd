import React from 'react';
import styled from '@emotion/styled';

import { MessageType } from './MessageList';
import defaultTheme from '../../../../../styles/theme';
import { IProfile } from '..';

interface ReceivedMessage extends MessageType {
  receiver: string;
  receiverThumbnailImage?: string;
}

const Base = styled.li`
  display: flex;
  width: 100%;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Content = styled.div``;

const UserName = styled.span`
  opacity: 0.8;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 5px;
`;

// const SpeechBubble = styled.span<{ backgroundColor: string }>`
//   background-color: ${({ backgroundColor }) => backgroundColor};
//   border-radius: 0 15px 15px 15px;
//   margin-right: 5px;
//   padding: 13px;
//   font-size: 18px;
// `;

const SpeechBubble = styled.span<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 0 15px 15px 15px;
  margin-right: 5px;
  padding: 13px;
  font-size: 18px;
  /* word-wrap: break-word; */
  max-width: 30rem; // 적절한 최대 너비를 설정하세요
`;

const ReceivedAt = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

export function Message({
  receiverThumbnailImage,
  receiver,
  timestamp,
  content,
}: IProfile) {
  const maxLength = 10; // 줄바꿈이 적용되는 최대 문자열 길이

  const formatContent = (text: string) => {
    const words = text.split(/\s+/);
    const lines: string[] = [];

    let currentLine = words[0];
    for (let i = 1; i < words.length; i += 1) {
      if (currentLine.length + words[i].length + 1 <= maxLength) {
        currentLine = `${currentLine} ${words[i]}`;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);

    return lines.join(' ');
  };

  return (
    <Base>
      <Image
        src={
          receiverThumbnailImage ||
          'file:///Users/joohyunkang/matchpoint/backend/assets/default/default.jpg'
        }
        alt={`${receiver}의 썸네일`}
      />
      <Content>
        <UserName>{receiver}</UserName>
        <ReceivedAt>{timestamp}</ReceivedAt>
        <Info>
          <SpeechBubble backgroundColor={defaultTheme.colors.white}>
            {formatContent(content)}
          </SpeechBubble>
        </Info>
      </Content>
    </Base>
  );
}
