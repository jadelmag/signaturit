import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { COLOR } from "../constants/colors.constants";
import { STATUS } from "../constants/status.constants";
import { getColorByStatus } from "./tracking.functions";

describe("getColorByStatus", () => {
  it("should return COLOR.YELLOW for STATUS.PENDING", () => {
    const result = getColorByStatus(STATUS.PENDING);
    expect(result).toBe(COLOR.YELLOW);
  });

  it("should return COLOR.RED for STATUS.DECLINED", () => {
    const result = getColorByStatus(STATUS.DECLINED);
    expect(result).toBe(COLOR.RED);
  });

  it("should return COLOR.GREEN for any other status", () => {
    const result = getColorByStatus("OTHER_STATUS");
    expect(result).toBe(COLOR.GREEN);
  });

  it("should return COLOR.GREEN for an empty status", () => {
    const result = getColorByStatus("");
    expect(result).toBe(COLOR.GREEN);
  });
});
