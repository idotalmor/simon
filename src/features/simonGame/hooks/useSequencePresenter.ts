import { useEffect, useState } from "react";

type useSequencePresenterProps = {
  sequence: number[];
  presentingTime?: number;
  delayBetweenPresenting?: number;
}

type useSequencePresenterType = {
  isPresenting: boolean;
  presented: number | null;
};
const useSequencePresenter = ({
                                sequence,
                                presentingTime = 500,
                                delayBetweenPresenting = 300
                              }: useSequencePresenterProps): useSequencePresenterType => {
  const [isPresenting, setIsPresenting] = useState<boolean>(false);
  const [presented, setPresented] = useState<number | null>(null);

  useEffect(() => {
    if (sequence.length > 0) {
      setIsPresenting(true);
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < sequence.length) {
          setPresented(sequence[currentIndex]);

          setTimeout(() => {
            setPresented(null);
            currentIndex++;
            if (currentIndex >= sequence.length) {
              setIsPresenting(false);
              clearInterval(interval);
            }
          }, presentingTime);
        }
      }, presentingTime + delayBetweenPresenting); // 1 second press duration + 0.2 seconds delay between presses

      return () => {
        setIsPresenting(false);
        clearInterval(interval);
      };
    }
  }, [sequence, presentingTime, delayBetweenPresenting]);

  return { isPresenting, presented };

};

export default useSequencePresenter;
