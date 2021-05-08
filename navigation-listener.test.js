import { jest } from "@jest/globals";
import { navigationListener } from "./navigation-listener.js";

const badgeMock = jest.fn();
const mockNavigationListener = {
  setBadgeText: badgeMock,
};

beforeEach(() => {
  badgeMock.mockReset();
});

test("navigationListener sets badge text", () => {
  const details = {
    url: "pokellector.come/sets/base?list_display=list",
    frameId: 0,
  };
  navigationListener(details, mockNavigationListener);
  expect(badgeMock.mock.calls.length).toBe(1);
});

test("navigationListener doesn't set badge text", () => {
  const details = {
    url: "www.google.com",
    frameId: 0,
  };
  navigationListener(details, mockNavigationListener);
  expect(badgeMock.mock.calls.length).toBe(0);
});
