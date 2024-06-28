import "react-native";
import { it } from "@jest/globals";
import { act, renderHook } from "@testing-library/react-native";
import { ResultsUIState, useResults } from "../hooks/useResults.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { addGame } from "../../../store/slices/gameSlice.ts";

jest.mock("../../../store/hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn()
}));

jest.mock("../../../store/slices/gameSlice", () => ({
  ...jest.requireActual("../../../store/slices/gameSlice"),
  addGame: jest.fn()
}));

describe("useResults hook", () => {
  let dispatch: jest.Mock;

 // Drawback: I am using Jest mocks instead of Redux mocks lib.
 // Since this is a small project and the state is straightforward,
 // I am only checking if the hooks call the correct store functions.
  beforeEach(() => {
    dispatch = jest.fn();
    (useAppSelector as jest.Mock).mockReset();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  });


  it("supports empty state", () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    const { result } = renderHook(() => useResults());

    expect(result.current.state.uiState).toBe(ResultsUIState.Empty);
  });

  it("support list state", () => {
    //fixture
    const game = { name: "User1", points: 50 };
    (useAppSelector as jest.Mock).mockReturnValue([game]);

    const { result } = renderHook(() => useResults());

    expect(result.current.state.uiState).toBe(ResultsUIState.List);
    expect(result.current.state.games).toEqual([game]);
  });

  it("support addGame to store", () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    const { result } = renderHook(() => useResults());

    act(() => {
      result.current.saveGame("TestUser", 100);
    });

    expect(dispatch).toHaveBeenCalledWith(addGame.type);
    expect(addGame).toHaveBeenCalledWith({ "name": "TestUser", "points": 100 });

  });
});
