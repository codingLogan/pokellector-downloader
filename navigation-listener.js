export function navigationListener(details, chromeAction) {
  const { frameId, tabId, url } = details;
  const regEx = /pokellector.*\?list_display=list/;
  if (frameId === 0) {
    if (regEx.test(url)) {
      chromeAction.setBadgeText({
        text: "Go",
        tabId,
      });
    }
  }
}
