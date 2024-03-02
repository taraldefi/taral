import { getToken } from "./utils";
import 'mocha';
import 'jest';

describe("metrics - Utils", () => {
  describe("getToken", () => {
    it("returns uppercase token", () => {
      expect(getToken("foo")).toBe("OTEL_METRIC_FOO");
    });
  });
});
