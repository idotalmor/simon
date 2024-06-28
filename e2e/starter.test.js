import { device, element, by, expect } from 'detox';
import { TEST_IDS } from "../src/constants/testIDs"; // Import necessary modules from Detox
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
});
