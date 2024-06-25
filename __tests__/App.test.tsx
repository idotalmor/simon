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

    //Check standby mode before new game
    expect(result.current.state).toEqual(standByObj);
    act(() => result.current.newGame());

    //check new game state
    const gameState: Partial<SimonState> = { gameState: GameState.Playing, userStepIndex: 0, points: 0 };
    expect(result.current.state).toMatchObject(gameState);
    expect(result.current.state.sequence).toHaveLength(1);
  });

  it("play round with a single step", () => {
    const { result } = renderHook(() => useSimon());

    act(() => result.current.newGame()); //create new game

    //play 1 step
    const { sequence } = result.current.state;
    let playResult: boolean | undefined;
    act(() => {playResult = result.current.play(sequence[0]);});
    expect(playResult).toBe(true);

    //check game state
    const gameState: Partial<SimonState> = { gameState: GameState.Playing, userStepIndex: 0, points: 1 };
    expect(result.current.state).toMatchObject(gameState);
    expect(result.current.state.sequence).toHaveLength(2);//check new sequence
  });

  it("play step in round with multiple steps", () => {
    const { result } = renderHook(() => useSimon());

    //*fixture* - create a round with multiple steps
    act(() => result.current.newGame());
    act(() => {result.current.play(result.current.state.sequence[0]);}); //play the first round
    expect(result.current.state).toMatchObject({ gameState: GameState.Playing, userStepIndex: 0, points: 1 });
    expect(result.current.state.sequence).toHaveLength(2);//check new round with multiple steps

    //move to next step
    act(() => {result.current.play(result.current.state.sequence[0]);});
    const nextStepState: Partial<SimonState> = { gameState: GameState.Playing, userStepIndex: 1, points: 1 };
    expect(result.current.state).toMatchObject(nextStepState);

    //finish round with multiple steps
    act(() => {result.current.play(result.current.state.sequence[1]);});
    const finishRoundState: Partial<SimonState> = { gameState: GameState.Playing, userStepIndex: 0, points: 2 };
    expect(result.current.state).toMatchObject(finishRoundState);
  });

});

it("renders correctly", () => {
  renderer.create(<App />);
});
