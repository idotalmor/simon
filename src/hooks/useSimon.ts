import { useState } from "react";

enum GameState {Standby, Playing, End}

type SimonState = {
  gameState: GameState;
  sequence: number[];
  userStepIndex: number,
  points: number
}

const standByObj: SimonState = {
  gameState: GameState.Standby,
  sequence: [],
  userStepIndex: 0,
  points: 0
};

type UseSimonReturnType = {
  state: SimonState;
  newGame: () => void;
  play: (selected: number) => boolean
};

const useSimon = (): UseSimonReturnType => {

  const [state, setState] = useState<SimonState>(standByObj);

  const newGame = () => {
    const newStep = getRandomNumber(0, 3);
    const newGameObj: SimonState = {
      gameState: GameState.Playing,
      sequence: [newStep],
      userStepIndex: 0,
      points: 0
    };
    setState(newGameObj);
  };

  const play = (selected: number): boolean => {
    if (state.gameState !== GameState.Playing) return false;
    setState(state => {
      if (selected === state.sequence[state.userStepIndex]) {//if step correct
        if (state.userStepIndex === state.sequence.length - 1) {//was last in round
          return {
            ...state,
            points: state.points + 1,
            sequence: [...state.sequence, getRandomNumber(0, 3)],
            userStepIndex: 0
          };
        } else { //just a successful step
          return {
            ...state,
            userStepIndex: state.userStepIndex + 1
          };
        }
      } else {//if user get the step wrong
        return {
          ...state,
          gameState: GameState.End
        };
      }
    });

    return true;
  };

  return { state, newGame, play };
};

const getRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { useSimon, standByObj, GameState };
export type { SimonState };
