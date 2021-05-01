// Show "Go" when extension can do its thing
// TODO, is there a better way to accomplish this?
// I've tried using actions, and declarativeContent with no luck
chrome.webNavigation.onCompleted.addListener(function (details) {
  const { frameId, tabId, url } = details;
  const regEx = /pokellector.*\?list_display=list/;
  if (frameId === 0) {
    if (regEx.test(url)) {
      chrome.action.setBadgeText({
        text: "Go",
        tabId,
      });
    }
  }
});
