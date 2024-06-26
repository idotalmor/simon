// src/store/__tests__/gameState.test.ts
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../slices/gameSlice";
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

});
