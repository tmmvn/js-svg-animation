/**
 * @author
 */
function parseContentOnly(url, id)
  {
    "use strict"
    const xmlHTTP = new XMLHttpRequest()
    xmlHTTP.onreadystatechange = function()
      {
        if (xmlHTTP.readyState === 4 && xmlHTTP.status === 200)
          {
            const receivedContent = JSON.parse(xmlHTTP.responseText)
            doParsing(receivedContent, id)
          }
      }
    xmlHTTP.open("GET", url, true)
    xmlHTTP.send()

    function doParsing(receivedContent, id)
      {
        var out = ""
        var i
        for (i = 0; i < receivedContent.contentFile.paragraphs.length; i++)
          {
            out += receivedContent.contentFile.paragraphs[i].content + "<br /><br />"
          }
        document.getElementById(id).innerHTML = out
      }
  }

function parseFullContent(url, id)
  {
    "use strict"
    var xmlHTTP = new XMLHttpRequest()
    xmlHTTP.onreadystatechange = function()
      {
        if (xmlHTTP.readyState === 4 && xmlHTTP.status === 200)
          {
            var receivedContent = JSON.parse(xmlHTTP.responseText)
            doparsing(receivedContent, id)
          }
      }
    xmlHTTP.open("GET", url, true)
    xmlHTTP.send()

    function doparsing(receivedContent, id)
      {
        var out = ""
        var i
        out += "<h1>" + receivedContent.contentFile.title + "</h1>"
        for (i = 0; i < receivedContent.contentFile.paragraphs.length; i++)
          {
            out += "<p>" + receivedContent.contentFile.paragraphs[i].content + "</p>"
          }
        document.getElementById(id).innerHTML = out
      }
  }