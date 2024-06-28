import { element, by, expect } from 'detox';
import { TEST_IDS } from "../../src/constants/testIDs.ts";

class GameScreenTK {
  async isVisible() {
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.SCREEN))).toBeVisible();
  }

  async tapResultsButton() {
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.RESULT_BTN))).toBeVisible();
    await element(by.id(TEST_IDS.GAME_SCREEN.RESULT_BTN)).tap();
  }

  async tapNewGameButton() {
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.NEW_GAME_BTN))).toBeVisible();
    await element(by.id(TEST_IDS.GAME_SCREEN.NEW_GAME_BTN)).tap();
  }

  async isGameStateVisible() {
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.GAME_STATE))).toBeVisible();
  }

  async isEmptyStateVisible() {
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.EMPTY_STATE))).toBeVisible();
  }

  async isEndStateVisible() {
    await expect(element(by.id(TEST_IDS.GAME_SCREEN.END_STATE))).toBeVisible();
  }

  async checkPoints(points: number) {
    await expect(element(by.text(`Points: ${points}`))).toBeVisible();
  }

  async play(num: number) {
    const buttonId = `button-${num}`;
    await expect(element(by.id(buttonId))).toBeVisible();
    await element(by.id(buttonId)).tap();
  }
}

export default new GameScreenTK();
