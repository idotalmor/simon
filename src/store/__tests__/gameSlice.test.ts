// src/store/__tests__/gameState.test.ts
import { configureStore } from "@reduxjs/toolkit";
import gameReducer, { addGame, GameRecord, selectTopGames } from "../slices/gameSlice";
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


  it("should handle addGame", () => {
    const game: GameRecord = { name: "User1", points: 50 };
    store.dispatch(addGame(game));
    const state: RootState = store.getState() as RootState;
    expect(state.game.games.length).toBe(1);
    expect(state.game.games[0]).toMatchObject(game);
  });

  it("should select top games", () => {
    const points = [20, 40, 24, 89, 39, 90, 23, 14, 54, 65, 99];
    points.forEach((ele, index) => {
      store.dispatch(addGame({ name: index.toString(), points: ele }));
    });
    const state: RootState = store.getState() as RootState;
    const topGames = selectTopGames(state.game);
    expect(topGames.length).toBe(10);
    const pointsArr = topGames.map(ele => ele.points);
    expect(pointsArr).toStrictEqual([99, 90, 89, 65, 54, 40, 39, 24, 23, 20]);
  });

});
