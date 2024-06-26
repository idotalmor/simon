// src/store/__tests__/gameState.test.ts
import { configureStore } from "@reduxjs/toolkit";
import gameReducer, { addGame, GameRecord } from "../slices/gameSlice";
import { RootState } from "../store";

describe("redux - game reducer", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: { game: gameReducer }
    });
  });

  it("should handle initial state", () => {
    const state: RootState = store.getState() as RootState;
    expect(state.game).toEqual({ games: [] });
  });


  it('should handle addGame', () => {
    const game: GameRecord = { name: 'User1', points: 50 };
    store.dispatch(addGame(game));
    const state: RootState = store.getState() as RootState;
    expect(state.game.games.length).toBe(1);
    expect(state.game.games[0]).toMatchObject(game);
  });

});
