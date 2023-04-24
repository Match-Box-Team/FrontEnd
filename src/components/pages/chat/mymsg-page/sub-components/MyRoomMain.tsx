// import React from 'react';

// export default function MyRoomMain() {
//   return (
//     <div>
//       <RoomMain>
//         <RoomContent>
//           <ProfileImg>
//             <img src={imageUrl} alt="profile" width="100%" height="100%" />
//           </ProfileImg>
//           <RoomBody>
//             <RoomTitle>{room.userChannel.channel.channelName}</RoomTitle>
//             <RoomMemeber>
//               {myRooms[index] &&
//                 myRooms[index].map((item: any, memberIndex: number) => {
//                   if (memberIndex < 2) {
//                     return (
//                       <Member key={item.user.userId}>
//                         {item.user.nickname}
//                       </Member>
//                     );
//                   }
//                   if (memberIndex === 2) {
//                     return (
//                       <Member key={item.user.userId}>
//                         외 {myRooms[index].length - 2}명
//                       </Member>
//                     );
//                   }
//                   return null;
//                 })}
//             </RoomMemeber>
//           </RoomBody>
//         </RoomContent>
//         <RoomInfo>
//           <LastMsgTime as="span">
//             {new Date(room.chat.time).toISOString().split('T')[0]}
//           </LastMsgTime>
//           <UnreadMsgCount
//             style={{
//               backgroundColor:
//                 room.chat.computedChatCount === 0 ? 'white' : 'red',
//             }}
//           >
//             <Unread>{room.chat.computedChatCount}</Unread>
//           </UnreadMsgCount>
//         </RoomInfo>
//       </RoomMain>
//     </div>
//   );
// }

import styled from 'styled-components';

export default function MyRoomMain(
  imageUrl: any,
  room: any,
  index: number,
  myRooms: any[],
) {
  const {
    userChannel: {
      channel: { channelName },
    },
    chat: { time, computedChatCount },
  } = room;
  return (
    <div>
      <RoomContent>
        <ProfileImg>
          <img src={imageUrl} alt="profile" width="100%" height="100%" />
        </ProfileImg>
        <RoomBody>
          <RoomTitle>{channelName}</RoomTitle>
          <RoomMemeber>
            {myRooms[index] &&
              myRooms[index].map((item: any, memberIndex: number) => {
                if (memberIndex < 2) {
                  return (
                    <Member key={item.user.userId}>{item.user.nickname}</Member>
                  );
                }
                if (memberIndex === 2) {
                  return (
                    <Member key={item.user.userId}>
                      외 {myRooms[index].length - 2}명
                    </Member>
                  );
                }
                return null;
              })}
          </RoomMemeber>
        </RoomBody>
      </RoomContent>
      <RoomInfo>
        <LastMsgTime as="span">
          {new Date(time).toISOString().split('T')[0]}
        </LastMsgTime>
        <UnreadMsgCount
          style={{
            backgroundColor: computedChatCount === 0 ? 'white' : 'red',
          }}
        >
          <Unread>{computedChatCount}</Unread>
        </UnreadMsgCount>
      </RoomInfo>
    </div>
  );
}

const RoomMain = styled.div`
  display: flex;
  width: 100%;
  text-align: start;
  margin-right: 2rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  justify-content: space-between;
`;

const ProfileImg = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: #ad4545;
  border-radius: 2.5rem;
  overflow: hidden;
  margin-left: 1rem;
  margin-right: 3.5rem;
`;

const RoomTitle = styled.div`
  font-size: 1.5rem;
  color: #000000;
  text-decoration: none;
  color: inherit;
  text-align: left;
`;

const RoomMemeber = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  color: #000000;
  text-decoration: none;
  color: inherit;
  text-align: left;
  margin-top: 1rem;
`;

const Member = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 0.5rem;
`;

const RoomContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 0.5rem;
`;

const RoomBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  width: 20%;
`;

const LastMsgTime = styled.div`
  font-size: 0.5rem;
  color: #797171;
  text-decoration: none;
`;

const UnreadMsgCount = styled.div`
  font-size: 1rem;
  color: white;
  text-decoration: none;
  border-radius: 1rem;
  margin-top: 1rem;
`;

const Unread = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  margin: 0.5rem;
  border-radius: 50%;
`;
