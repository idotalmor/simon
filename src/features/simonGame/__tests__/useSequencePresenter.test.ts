/**
 * @format
 */

import "react-native";

// Note: import explicitly to use the types shipped with jest.
import { it } from "@jest/globals";

// Note: test renderer must be required after react-native.
import { act, renderHook, waitFor } from "@testing-library/react-native";
import useSequencePresenter from "../hooks/useSequencePresenter.ts";

describe("Present sequence hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("empty sequence", () => {
    const sequence: number[] = [];
    const { result } = renderHook(() => useSequencePresenter({ sequence }));

    expect(result.current.isPresenting).toBe(false);
  });

  it("display sequence", async () => {
    const sequence: number[] = [1, 3];
    const presentingTime = 200;
    const delayBetweenPresenting = 200;

    const { result } = renderHook(() => useSequencePresenter({ sequence, presentingTime, delayBetweenPresenting }));

    expect(result.current.isPresenting).toBe(true);
    await waitFor(() => expect(result.current.presented).toBe(sequence[0]));

    act(() => {jest.advanceTimersByTime(presentingTime);});//fast-forward timer
    expect(result.current.presented).toBe(null);

    act(() => {jest.advanceTimersByTime(delayBetweenPresenting);});//fast-forward timer
    expect(result.current.presented).toBe(sequence[1]);

    act(() => {jest.advanceTimersByTime(presentingTime);});//fast-forward timer
    expect(result.current.isPresenting).toBe(false);

  });

});
