/**
 * @format
 */

import "react-native";

// Note: import explicitly to use the types shipped with jest.
import { it } from "@jest/globals";

// Note: test renderer must be required after react-native.
import { act, renderHook } from "@testing-library/react-native";
import { GameState, SimonState, standByObj, useSimon } from "../hooks/useSimon.ts";

describe("Simon game hook", () => {
  it("create new game", () => {
    const { result } = renderHook(() => useSimon());

    // Check standby mode before starting a new game
    expect(result.current.state).toEqual(standByObj);

    // Start a new game
    act(() => result.current.newGame());

    //check new game state
    const newGameState: Partial<SimonState> = {
      gameState: GameState.Playing,
      userStepIndex: 0,
      points: 0
    };
    expect(result.current.state).toMatchObject(newGameState);
    expect(result.current.state.sequence).toHaveLength(1);
  });

  it("play a round with a single step", () => {
    const { result } = renderHook(() => useSimon());

    // Start a new game
    act(() => result.current.newGame());

    // Play the first step
    const { sequence } = result.current.state;
    let playResult: boolean | undefined;
    act(() => {playResult = result.current.play(sequence[0]);});
    expect(playResult).toBe(true);

    //check game state
    const gameState: Partial<SimonState> = {
      gameState: GameState.Playing,
      userStepIndex: 0,
      points: 1
    };
    expect(result.current.state).toMatchObject(gameState);
    expect(result.current.state.sequence).toHaveLength(2);//check new sequence length
  });

  it("play a round with multiple steps", () => {
    const { result } = renderHook(() => useSimon());

    //*fixture* - create a round with multiple steps
    act(() => {result.current.newGame();}); // Start a new game
    act(() => {result.current.play(result.current.state.sequence[0]);}); //play the first round
    expect(result.current.state).toMatchObject({
        gameState: GameState.Playing,
        userStepIndex: 0,
        points: 1
      }
    );
    expect(result.current.state.sequence).toHaveLength(2);

    // Play the first step of the second round
    act(() => {result.current.play(result.current.state.sequence[0]);});
    expect(result.current.state).toMatchObject({
      gameState: GameState.Playing,
      userStepIndex: 1,
      points: 1
    });

    // Play the second step of the second round - This is unnecessary, but I keep it
    act(() => {result.current.play(result.current.state.sequence[1]);});

    expect(result.current.state).toMatchObject({
      gameState: GameState.Playing,
      userStepIndex: 0,
      points: 2
    });
  });

  it("End the game if the user makes a wrong step", () => {
    const { result } = renderHook(() => useSimon());

    //*fixture* - create a round with previous points
    act(() => {result.current.newGame();});
    act(() => {result.current.play(result.current.state.sequence[0]);});
    const newRoundState: Partial<SimonState> = {
      gameState: GameState.Playing,
      userStepIndex: 0,
      points: 1
    };
    expect(result.current.state).toMatchObject(newRoundState);

    // test
    act(() => {result.current.play(-1);});
    const endRoundState: Partial<SimonState> = { gameState: GameState.End, points: 1 };
    expect(result.current.state).toMatchObject(endRoundState);
  });

});
