import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GameRecord = {
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
        name: action.payload.name,
        points: action.payload.points,
      };
      state.games.push(newGame);
    },
  },
});

export const {  addGame} = gameSlice.actions;

export default gameSlice.reducer;
export type {GameRecord};
