/**
 * @format
 */

import "react-native";
import React from "react";
import App from "../App";

// Note: import explicitly to use the types shipped with jest.
import { it } from "@jest/globals";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { useSimon, standByObj, GameState, SimonState } from "../src/hooks/useSimon.ts";
import { act, renderHook } from "@testing-library/react-native";

describe("simon game", () => {
  it("create new game,", () => {
    const { result } = renderHook(() => useSimon());
    expect(result.current.state).toEqual(standByObj);
    act(() => result.current.newGame());
    expect(result.current.state).toMatchObject({ gameState: GameState.Playing, userStepIndex: 0, points:0 });
    expect(result.current.state.sequence).toHaveLength(1);
  });

  it("play 1 successful step",()=>{
    const { result } = renderHook(() => useSimon());

    act(() => result.current.newGame()); //create new game

    //play 1 step
    const { sequence } = result.current.state;
    let playResult: boolean | undefined;
    act(() => {playResult = result.current.play(sequence[0]);});
    expect(playResult).toBe(true);

    //check game status
    const gameStatus: Partial<SimonState> = {gameState: GameState.Playing, userStepIndex: 0,points: 1};
    expect(result.current.state).toMatchObject(gameStatus);
    expect(result.current.state.sequence).toHaveLength(2);//check new sequence
  });

});

it("renders correctly", () => {
  renderer.create(<App />);
});
