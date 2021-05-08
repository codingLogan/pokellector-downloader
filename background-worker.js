import { navigationListener } from "./navigation-listener.js";

// Show "Go" when extension can do its thing
// TODO, is there a better way to accomplish this?
// I've tried using actions, and declarativeContent with no luck
chrome.webNavigation.onCompleted.addListener(function (details) {
  navigationListener(details, chrome.action);
});
