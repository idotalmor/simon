import 'react-native';
import {it} from '@jest/globals';
import { renderHook } from "@testing-library/react-native";
import { ResultsUIState, useResults } from "../hooks/useResults.ts";
import { useAppSelector } from "../../../store/hooks.ts";

jest.mock("../../../store/hooks", () => ({
  useAppSelector: jest.fn(),
}));


describe('Result hook',() =>{

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockReset();
  });


  it('supports empty state', () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    const { result } = renderHook(() => useResults(),);

    expect(result.current.state.uiState).toBe(ResultsUIState.Empty);
  });

  it('support list state',()=>{
    //fixture
    const game = { name: "User1", points: 50 };
    (useAppSelector as jest.Mock).mockReturnValue([game]);

    const { result } = renderHook(() => useResults());

    expect(result.current.state.uiState).toBe(ResultsUIState.List);
    expect(result.current.state.games).toEqual([game]);
  });
});
