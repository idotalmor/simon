import { device } from "detox";

const waitForTimer = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const pressBack = async () => {
  if (device.getPlatform() === "android") {
    await device.pressBack();
  } else {
    await element(by.traits(["button"]))
      .atIndex(0)
      .tap();
  }
};

export { waitForTimer, pressBack };
