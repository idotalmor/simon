import { useState } from "react";
import { GameRecord } from "../../../store/slices/gameSlice.ts";

enum ResultsUIState {Empty, List}

type ResultState = {
  uiState: ResultsUIState.Empty,
  games?: GameRecord[]
}
type UseResultsReturnType = {
  state: ResultState
}
const useResults = (): UseResultsReturnType => {
  const [state, setState] = useState<ResultState>({uiState:ResultsUIState.Empty});
  return { state };
};

export { useResults,ResultsUIState };
