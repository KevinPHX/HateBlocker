chrome.runtime.onMessage.addListener(function(message) {
    var enable = message.enable;
    console.log(message)
    if (message.url.substring(0, 19) == "https://twitter.com") {
        twitter(enable)
    } else if (message.url.substring(0, 19) == "https://www.youtube") {

        youtube(enable)
    }
});


function twitter(enable) {
  (async () => {
    var articles = document.getElementsByTagName("article");
    console.log(articles)
    for (article of articles) {
      currentHTML = article.innerHTML;
        if (currentHTML.length > 0) {
          if (enable) {
              const payload = await makePromise(article.innerText);
              console.log(payload)
              if (payload.message =="negative") {
                article.innerHTML =  "<div id='cover' style='background-color: grey; opacity:0.1; width:100%'>"+currentHTML+"</div>";
              }
          } else {
            var el = document.createElement( 'div' );
            el.innerHTML = currentHTML;
            if (el.childNodes[0].id == "cover") {
              article.innerHTML = el.childNodes[0].innerHTML
            } else {
              article.innerHTML = currentHTML;
            }
          }
        }


    }
  })();
}

async function youtube(enable) {
  var comments = document.getElementsByTagName("ytd-comment-thread-renderer")
  console.log(comments)
  for (comment of comments) {
    currentHTML = comment.innerHTML;
      if (currentHTML.length > 0) {
        if (enable) {
            const payload = await makePromise(comment.innerText);
            console.log(payload)
            if (payload.message =="negative") {
              comment.innerHTML =  "<div id='cover' style='background-color: grey; opacity:0.1; width:100%'>"+currentHTML+"</div>";
            }
        } else {
          console.log(currentHTML)
          var el = document.createElement( 'div' );
          el.innerHTML = currentHTML;
          if (el.childNodes[0].id == "cover") {
            comment.innerHTML = el.childNodes[0].innerHTML
          } else {
            comment.innerHTML = currentHTML;
          }
        }
      }


  }
}


function analyze(text) {
  chrome.runtime.sendMessage({ directive: "analyze", text:  text}, function(response) {
    console.log(response)
  });
}

function makePromise(text) {
  let promise = new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ directive: "analyze", text:  text}, function(response) {
      resolve(response);
    });
  })
  return promise

}
