import { element, by, expect } from 'detox';
import { TEST_IDS } from "../../src/constants/testIDs.ts";

class ResultsScreenTK {
  async isVisible() {
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.SCREEN))).toBeVisible();
  }

  async isEmptyStateVisible() {
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.EMPTY_STATE))).toBeVisible();
  }

  async isPopupVisible() {
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP))).toBeVisible();
  }

  async enterTextInPopupInput(text: string) {
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP_INPUT))).toBeVisible();
    await element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP_INPUT)).typeText(text);
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP_INPUT))).toHaveText(text);
  }

  async submitPopup() {
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP_SUBMIT))).toBeVisible();
    await element(by.id(TEST_IDS.RESULTS_SCREEN.POPUP_SUBMIT)).tap();
  }

  async isListStateVisible() {
    await expect(element(by.id(TEST_IDS.RESULTS_SCREEN.LIST_STATE))).toBeVisible();
  }

  async checkScoreEntry(entry: string) {
    await expect(element(by.text(entry))).toBeVisible();
  }
}

export default new ResultsScreenTK();
