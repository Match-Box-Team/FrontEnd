interface IUser {
  userId: string;
  nickname: string;
  image: string;
}

export interface IMatch {
  user1: IUser;
  user2: IUser;
  currentViewer: number;
  gameWatchId: string;
}

export interface IGameWatch {
  gameId: string;
  gameName: string;
  matches: IMatch[];
}

export interface IGameHistory {
  user1: string;
  user1Image: string;
  user2: string;
  user2Image: string;
  currentViewer: number;
  matchId: string;
}

export interface IGameInfo {
  gameId: string;
  name: string;
  price: number;
  isPlayable: boolean;
  isBuy: boolean;
}
