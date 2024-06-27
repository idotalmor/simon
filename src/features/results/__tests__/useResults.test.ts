import 'react-native';
import {it} from '@jest/globals';
import { renderHook } from "@testing-library/react-native";
import { ResultsUIState, useResults } from "../hooks/useResults.ts";
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../../../store/slices/gameSlice.ts";

describe('Result hook',() =>{
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: { game: gameReducer }
    });
  });

  it('support empty state',()=>{
    const { result } = renderHook(() => useResults());

    expect(result.current.state.uiState).toBe(ResultsUIState.Empty);
  });
});
