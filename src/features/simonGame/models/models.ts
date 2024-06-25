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

export { standByObj, GameState };
export type { SimonState };
