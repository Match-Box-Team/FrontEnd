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

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat/channel" element={<Channel />} />
        <Route path="/chat/room/:id" element={<ChatRoom />} />
        <Route path="/chat/mymsg" element={<MyMsg />} />
        <Route path="/friend/add" element={<AddFriend />} />
        <Route path="/friend/list" element={<FriendList />} />
        <Route path="/friend/banned" element={<BannedList />} />
        <Route path="/game/record" element={<GameRecord />} />
        <Route path="/game/shop" element={<GameShop />} />
        <Route path="/game/play" element={<PlayGame />} />
        <Route path="/game/watch" element={<WatchGame />} />
        <Route path="/profile/friend/:id" element={<FriendProfile />} />
        <Route path="/profile/my/:id" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
