import { device } from 'detox';
import GameScreenTK from "./test-kit/GameScreenTK.ts";
import ResultsScreenTK from "./test-kit/ResultsScreenTK.ts";
import { pressBack, waitForTimer } from "./test-kit/Helper.ts";


describe('E2E test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('navigation', async () => {
    await GameScreenTK.isVisible();
    await GameScreenTK.tapResultsButton();
    await ResultsScreenTK.isVisible();
  });

  it('skeleton', async () => {
    const presentTime = 800;

    // assert game empty screen
    await GameScreenTK.isVisible();
    await GameScreenTK.isEmptyStateVisible();

    // navigate to result screen
    await GameScreenTK.tapResultsButton();

    // assert result empty state
    await ResultsScreenTK.isVisible();
    await ResultsScreenTK.isEmptyStateVisible();

    // back to game state
    await pressBack();

    // assert empty state
    await GameScreenTK.isVisible();
    await GameScreenTK.isEmptyStateVisible();

    // start new game
    await GameScreenTK.tapNewGameButton();

    // assert new game
    await GameScreenTK.isGameStateVisible();
    await GameScreenTK.checkPoints(0);

    // wait for end of presenting sequence
    await waitForTimer(presentTime);

    // tap on selected button (mock is 2)
    await GameScreenTK.play(2);

    // assert points
    await GameScreenTK.checkPoints(1);

    // wait for end of presenting sequence
    await waitForTimer(presentTime * 2);

    // pressing on the wrong button
    await GameScreenTK.play(1);

    // assert result popup visibility
    await ResultsScreenTK.isPopupVisible();

    // add text to input
    await ResultsScreenTK.enterTextInPopupInput('Ido');

    // submit
    await ResultsScreenTK.submitPopup();

    // assert list state
    await ResultsScreenTK.isVisible();
    await ResultsScreenTK.isListStateVisible();
    await ResultsScreenTK.checkScoreEntry('Ido : 1');

    await pressBack();

    // assert empty state
    await GameScreenTK.isVisible();
    await GameScreenTK.isEndStateVisible();
  });
});
