/**
 * @format
 */

import "react-native";
import React from "react";
import App from "../App";

// Note: import explicitly to use the types shipped with jest.
import { it } from "@jest/globals";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import useSimon from "../src/hooks/useSimon.ts";
import { act, renderHook } from "@testing-library/react-native";

describe("simon game", () => {
  it("create new game,", () => {
    const { result } = renderHook(() => useSimon());
    expect(result.current.sequence).toHaveLength(0);
    act(()=>result.current.newGame());
    expect(result.current.sequence).toHaveLength(1);
  });
});

it("renders correctly", () => {
  renderer.create(<App />);
});
