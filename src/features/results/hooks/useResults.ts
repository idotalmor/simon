import { useEffect, useState } from "react";
import { addGame, GameRecord, selectTopGames } from "../../../store/slices/gameSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";

enum ResultsUIState {Empty, List}

type ResultState = {
  uiState: ResultsUIState,
  games?: GameRecord[]
}
type UseResultsReturnType = {
  state: ResultState,
  saveGame: (name: string, points: number) => void
}

const useResults = (): UseResultsReturnType => {
  const topGames = useAppSelector(selectTopGames);
  const dispatch = useAppDispatch();

  const [state, setState] = useState<ResultState>({ uiState: ResultsUIState.Empty });

  useEffect(() => {
    if (topGames.length > 0) {
      setState({ uiState: ResultsUIState.List, games: topGames });
    } else {
      setState({ uiState: ResultsUIState.Empty });
    }
  }, [topGames]);

  const saveGame = (name: string, points: number) => {
    dispatch(addGame({ name, points }));
  };

  return { state, saveGame };
};

export { useResults, ResultsUIState };
