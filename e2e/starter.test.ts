import { device, element, by, expect } from 'detox';
import { TEST_IDS } from "../src/constants/testIDs";
import { getRandomNumber } from "../src/features/simonGame/utils.js"; // Import necessary modules from Detox

const waitForTimer = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
export const pressBack = async () => {
  if (device.getPlatform() === 'android') {
    await device.pressBack();
  } else {
    await element(by.traits(['button']))
      .atIndex(0)
      .tap();
  }
};
describe('E2E test', () => {

  beforeAll(async () => {
    await device.launchApp();

  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('navigation', async () => {
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.SCREEN))).toBeVisible();
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.RESULT_BTN))).toBeVisible();
    await element(by.id(TEST_IDS.GAME_SCREEN.RESULT_BTN)).tap();
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.SCREEN))).toBeVisible();
  });

  it('skeleton', async () => {

    const presentTime = 800;
    //assert game empty screen
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.SCREEN))).toBeVisible();
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.EMPTY_STATE))).toBeVisible();

    //navigate to result screen
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.RESULT_BTN))).toBeVisible();
    await element(by.id(TEST_IDS.GAME_SCREEN.RESULT_BTN)).tap();

    //assert result empty state
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.SCREEN))).toBeVisible();
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.EMPTY_STATE))).toBeVisible();

    //back to game state
    await pressBack();

    //assert empty state
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.SCREEN))).toBeVisible();
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.EMPTY_STATE))).toBeVisible();

    //start new game
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.NEW_GAME_BTN))).toBeVisible();
    await element(by.id(TEST_IDS.GAME_SCREEN.NEW_GAME_BTN)).tap();

    //assert new game
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.GAME_STATE))).toBeVisible();
    await expect(element(by.text('Points: 0'))).toBeVisible();

    //wait for end of presenting sequence
    await waitForTimer(presentTime);

    //tap on selected button (mock is 2)
    await expect(element(by.id("button-2"))).toBeVisible();
    await element(by.id("button-2")).tap();

    //assert points
    await expect(element(by.text('Points: 1'))).toBeVisible();

    await waitForTimer(presentTime*2);

    //pressing on the wrong button
    await expect(element(by.id("button-1"))).toBeVisible();
    await element(by.id("button-1")).tap();

    //assert result popup visibility
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP))).toBeVisible();

    //add text to input
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP_INPUT))).toBeVisible();
    await element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP_INPUT)).typeText('Ido');
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP_INPUT))).toHaveText('Ido');

    //submit
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP_SUBMIT))).toBeVisible();
    await element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP_SUBMIT)).tap();


    //assert list state
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.SCREEN))).toBeVisible();
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.LIST_STATE))).toBeVisible();

    await expect(element(by.text('Ido : 1'))).toBeVisible();

    await pressBack();

    //assert empty state
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.SCREEN))).toBeVisible();
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.END_STATE))).toBeVisible();

  });
});
