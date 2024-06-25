import { useState } from "react";

type UseSimonReturnType = {
  sequence: number[];
  newGame: () => void
};
const useSimon = (): UseSimonReturnType => {

  const [sequence, setSequence] = useState<number[]>([]);

  const newStep = () => {
    setSequence(value => {
      const newStep = getRandomNumber(0, 3);
      return [...value, newStep];
    });
  };

  const newGame = () => {
    newStep();
  };

  return { sequence, newGame };
};

const getRandomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export default useSimon;
