function clickHandler(e) {
  // if (window.disable) {
  //   clearInterval(window.disable)
  // }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    console.log("here")
    // window.enable = setInterval( function() {
      chrome.runtime.sendMessage({directive: "popup-click", url: activeTab, enable: true}, function(response) {});
    // }, 1500);

  });
}

function clickHandler2(e){
  // console.log(window.enable)
  // if (window.enable) {
  //   clearInterval(window.enable)
  // }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    // window.disable = setInterval( function() {
      chrome.runtime.sendMessage({directive: "popup-click-clear", url: activeTab, enable: false}, function(response) {});
  // }, 1500);

  });
}

// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('click-me').addEventListener('click', clickHandler);
// })
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('click-me').addEventListener('click', clickHandler);
    document.getElementById('click-me2').addEventListener('click', clickHandler2);
})
