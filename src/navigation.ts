export enum Screens {
  SimonGame = 'SimonGame',
  ResultScreen = 'ResultScreen',
}

export type RootStackParamList = {
  [Screens.SimonGame]: undefined;
  [Screens.ResultScreen]: { points?: number | undefined };
};
