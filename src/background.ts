console.log("Hello from background");

chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  console.table(request);
});

export {};
