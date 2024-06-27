import { useEffect, useState } from "react";
import { GameRecord, selectTopGames } from "../../../store/slices/gameSlice.ts";
import { useAppSelector } from "../../../store/hooks.ts";

enum ResultsUIState {Empty, List}

type ResultState = {
  uiState: ResultsUIState,
  games?: GameRecord[]
}
type UseResultsReturnType = {
  state: ResultState
}
const useResults = (): UseResultsReturnType => {
  const topGames = useAppSelector((state) => selectTopGames(state.game));

  const [state, setState] = useState<ResultState>({ uiState: ResultsUIState.Empty });

  useEffect(() => {
    if (topGames.length > 0) {
      setState({ uiState: ResultsUIState.List, games: topGames });
    } else {
      setState({ uiState: ResultsUIState.Empty });
    }
  }, [topGames]);

  return { state };
};

export { useResults, ResultsUIState };
