import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "../store.ts";

type GameRecord = {
  id: string;
  name: string;
  points: number;
};

type GameRecordsState = {
  games: GameRecord[];
};

const initialState: GameRecordsState = { games: []};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<{ name: string; points: number }>) => {
      const newGame = {
        id: uuidv4(),
        name: action.payload.name,
        points: action.payload.points,
      };
      state.games.push(newGame);
    },
  },
});

export const {  addGame} = gameSlice.actions;

const getGameState = (state: RootState): GameRecordsState => state.game;

export const selectTopGames = createSelector(
  [getGameState],
  (gameState) => {
    return gameState.games
      .slice()
      .sort((a, b) => b.points - a.points)
      .slice(0, 10);
  }
);

export default gameSlice.reducer;
export type {GameRecord};
