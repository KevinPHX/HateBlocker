chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.directive) {
        case "popup-click":
            chrome.tabs.executeScript(null, {
                file: "content.js",
                allFrames: true
            }, function() {
              console.log(request.enable)
              chrome.tabs.sendMessage(request.url.id, {url: request.url.url, enable: request.enable});
            });
            sendResponse({})
            break;
        case "popup-click-clear":
            chrome.tabs.executeScript(null, {
                file: "content.js",
                allFrames: true
            }, function() {
              console.log(request.enable)
              chrome.tabs.sendMessage(request.url.id, {url: request.url.url, enable: false});
            });
            sendResponse({})
            break;
          case "analyze":
            (async () => {
              const payload = await doAjax(request.text);
              sendResponse({message: payload});
            })();
            return true;
        default:
            console.log("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);

function doAjax(text){
  const response =  $.ajax({
    type: 'POST',
    url: 'http://localhost:5000/analyzeText',
    data: {text: text}
  })
  return response;
}
