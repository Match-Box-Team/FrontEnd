import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/pages/login/login-page/Login';
import Auth from './components/pages/login/auth-page/Auth';
import Channel from './components/pages/chat/channel-page/Channel';
import ChatRoom from './components/pages/chat/chatroom-page/ChatRoom';
import MyMsg from './components/pages/chat/mymsg-page/MyMsg';
import AddFriend from './components/pages/friend/addfriend-page/AddFriend';
import FriendList from './components/pages/friend/friendlist-page/FriendList';
import BannedList from './components/pages/friend/bannedlist-page/BannedList';
import GameRecord from './components/pages/game/gamerecord-page/GameRecord';
import GameShop from './components/pages/game/gameshop-page/GameShop';
import PlayGame from './components/pages/game/playgame-page/PlayGame';
import WatchGame from './components/pages/game/watchgame-page/WatchGame';
import FriendProfile from './components/pages/profiles/friend-page/FriendProfile';
import MyProfile from './components/pages/profiles/my-page/MyProfile';
import CheckLogin from './components/pages/login/login-page/CheckLogin';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/chat/channel"
          element={
            <CheckLogin>
              <Channel />
            </CheckLogin>
          }
        />
        <Route
          path="/chat/channel/:id"
          element={
            <CheckLogin>
              <ChatRoom />
            </CheckLogin>
          }
        />
        <Route
          path="/chat/mymsg"
          element={
            <CheckLogin>
              <MyMsg />
            </CheckLogin>
          }
        />
        <Route
          path="/friend/add"
          element={
            <CheckLogin>
              <AddFriend />
            </CheckLogin>
          }
        />
        <Route
          path="/friend/list"
          element={
            <CheckLogin>
              <FriendList />
            </CheckLogin>
          }
        />
        <Route
          path="/friend/banned"
          element={
            <CheckLogin>
              <BannedList />
            </CheckLogin>
          }
        />
        <Route
          path="/game/record"
          element={
            <CheckLogin>
              <GameRecord />
            </CheckLogin>
          }
        />
        <Route
          path="/game/shop"
          element={
            <CheckLogin>
              <GameShop />
            </CheckLogin>
          }
        />
        <Route
          path="/game/play"
          element={
            <CheckLogin>
              <PlayGame />
            </CheckLogin>
          }
        />
        <Route
          path="/game/watch"
          element={
            <CheckLogin>
              <WatchGame />
            </CheckLogin>
          }
        />
        <Route
          path="/profile/friend/:id"
          element={
            <CheckLogin>
              <FriendProfile />
            </CheckLogin>
          }
        />
        <Route
          path="/profile/my/:id"
          element={
            <CheckLogin>
              <MyProfile />
            </CheckLogin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
