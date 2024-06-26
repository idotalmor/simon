import { createSlice } from '@reduxjs/toolkit';

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
  reducers: {},
});

export const {  } = gameSlice.actions;

export default gameSlice.reducer;
export type {GameRecordsState};
