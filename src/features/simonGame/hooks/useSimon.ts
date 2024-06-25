import { useCallback, useState } from "react";
import { GameState, SimonState, standByObj } from "../models/models.ts";
import { getRandomNumber } from "../utils.ts";

type UseSimonReturnType = {
  state: SimonState;
  newGame: () => void;
  play: (selected: number) => boolean
};

const useSimon = (): UseSimonReturnType => {

  const [state, setState] = useState<SimonState>(standByObj);

  const newGame = useCallback(() => {
    const newStep = getRandomNumber(0, 3);
    const newGameObj: SimonState = {
      gameState: GameState.Playing,
      sequence: [newStep],
      userStepIndex: 0,
      points: 0
    };
    setState(newGameObj);
  }, []);

  const play = useCallback((selected: number): boolean => {
    if (state.gameState !== GameState.Playing) return false;
    setState(prevState => {
      if (selected === prevState.sequence[prevState.userStepIndex]) {//if step correct
        if (prevState.userStepIndex === prevState.sequence.length - 1) {//was last in round
          return {
            ...prevState,
            points: prevState.points + 1,
            sequence: [...prevState.sequence, getRandomNumber(0, 3)],
            userStepIndex: 0
          };
        } else { //just a successful step
          return {
            ...prevState,
            userStepIndex: prevState.userStepIndex + 1
          };
        }
      } else { //if user get the step wrong
        return {
          ...prevState,
          gameState: GameState.End
        };
      }
    });

    return true; //even a false answer is a valid turn
  }, [state.gameState]);

  return { state, newGame, play };
};

export { useSimon };
