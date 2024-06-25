import { useState } from "react";

enum GameState {Standby, Playing, End}

type SimonState = {
  gameState: GameState;
  sequence?: number[];
  userStepIndex?: number
}

const standByObj: SimonState = {
  gameState: GameState.Standby
};

type UseSimonReturnType = {
  state: SimonState;
  newGame: () => void;
};

const useSimon = (): UseSimonReturnType => {

  const [state, setState] = useState<SimonState>(standByObj);


  const newGame = () => {
    const newStep = getRandomNumber(0, 3);
    const newGameObj: SimonState = {
      gameState: GameState.Playing,
      sequence: [newStep],
      userStepIndex: 0
    };
    setState(newGameObj);
  };

  return { state, newGame };
};

const getRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { useSimon, standByObj, GameState };
