function linearlyInterpolate(a, b, t)
  {
    "use strict"
    if (Math.abs(a - b) > 0.05)
      {
        return ( a + t * ( b - a ) )
      }
    else
      {
        return b
      }
  }

function normalizeAngle(angle)
  {
    "use strict"
    while (angle < Math.PI)
      {
        angle = angle + Math.PI
      }
    while (angle > Math.PI)
      {
        angle = angle - Math.PI
      }
  }

// shouldn't need to drag the down so far in the chain, ugly
function updatePageContent(page, down)
  {
    let targetPage = page
    if (down)
      {
        targetPage = targetPage - 1
      }
    switch (targetPage)
      {
      case 0:
        document.getElementById("who").style.display = "none"
        document.getElementById("what").style.display = "none"
        document.getElementById("how").style.display = "none"
        document.getElementById("more").style.display = "none"
        break
      case 1:
        document.getElementById("who").style.display = "block"
        document.getElementById("what").style.display = "none"
        document.getElementById("how").style.display = "none"
        document.getElementById("more").style.display = "none"
        break
      case 2:
        document.getElementById("who").style.display = "none"
        document.getElementById("what").style.display = "block"
        document.getElementById("how").style.display = "none"
        document.getElementById("more").style.display = "none"
        break
      case 3:
        document.getElementById("who").style.display = "none"
        document.getElementById("what").style.display = "none"
        document.getElementById("how").style.display = "block"
        document.getElementById("more").style.display = "none"
        break
      case 4:
        document.getElementById("who").style.display = "none"
        document.getElementById("what").style.display = "none"
        document.getElementById("how").style.display = "none"
        document.getElementById("more").style.display = "block"
        break
      default:
        alert("Code broke")
      }
  }

function sortCircles(page)
  {
    "use strict"
    const svgobject = document.getElementById("svgobject")
    if (!svgobject)
      {
        return
      }
    const subDoc = getSVGDocument(svgobject)
    if (!subDoc)
      {
        return
      }
    const domParent = subDoc.getElementById("scene")
    let circle
    let text
    switch (page)
      {
      case 0:
        break
      case 1:
        circle = subDoc.getElementById("firstcircle")
        text = subDoc.getElementById("firsttext")
        break
      case 2:
        circle = subDoc.getElementById("secondcircle")
        text = subDoc.getElementById("secondtext")
        break
      case 3:
        circle = subDoc.getElementById("thirdcircle")
        text = subDoc.getElementById("thirdtext")
        break
      case 4:
        circle = subDoc.getElementById("fourthcircle")
        text = subDoc.getElementById("fourthtext")
        break
      default:
        alert("Code failed")
      }
    domParent.removeChild(circle)
    domParent.removeChild(text)
    domParent.appendChild(circle)
    domParent.appendChild(text)
  }

// Radial svg animation: animates element and it's text to target spiraling
function radialAnimate(element, target, text, page, down)
  {
    "use strict"
    const targetX = parseFloat(target.getAttribute("cx"))
    const targetY = parseFloat(target.getAttribute("cy"))
    const startX = parseFloat(element.getAttribute("cx"))
    const startY = parseFloat(element.getAttribute("cy"))
    const textOffsetX = parseFloat(text.getAttribute("x")) - startX
    const textOffsetY = parseFloat(text.getAttribute("y")) - startY
    const distanceToTargetX = targetX - startX
    const distanceToTargetY = targetY - startY
    const distanceToTarget = Math.sqrt(distanceToTargetX * distanceToTargetX + distanceToTargetY * distanceToTargetY)
    let currentRadius = 0
    let currentAngle = 0
    let useSphere = true
    // could maybe switch this to use the requestanimationframe
    const id = setInterval(frame, 60 / 1000)

    function frame()
      {
        let currentX = parseFloat(element.getAttribute("cx"))
        let currentY = parseFloat(element.getAttribute("cy"))
        currentAngle = currentAngle - Math.PI / 6
        normalizeAngle(currentAngle)
        const distanceX = startX - currentX
        const distanceY = startY - currentY
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        const diff = distanceToTarget - distance
        if (diff > 0.0)
          {
            currentRadius = linearlyInterpolate(distance, distanceToTarget, 0.05)
          }
        else
          {
            useSphere = false
          }
        if (currentX === targetX && currentY === targetY)
          {
            clearInterval(id)
            element.setAttribute("cx", targetX)
            element.setAttribute("cy", targetY)
            text.setAttribute("x", currentX + textOffsetX)
            text.setAttribute("y", currentY + textOffsetY)
            updatePageContent(page, down)
          }
        else
          {
            if (useSphere)
              {
                currentX = currentX + currentRadius * Math.sin(currentAngle)
                currentY = currentY + currentRadius * Math.cos(currentAngle)
              }
            else
              {
                currentX = linearlyInterpolate(currentX, targetX, 0.15)
                currentY = linearlyInterpolate(currentY, targetY, 0.15)
              }
            element.setAttribute("cx", currentX)
            element.setAttribute("cy", currentY)
            text.setAttribute("x", currentX + textOffsetX)
            text.setAttribute("y", currentY + textOffsetY)
          }
      }
  }

// Linear svg transformation, animates element, and its text to target
function animate(element, target, text, page, down)
  {
    "use strict"
    const targetX = parseFloat(target.getAttribute("cx"))
    const targetY = parseFloat(target.getAttribute("cy"))
    const startX = parseFloat(element.getAttribute("cx"))
    const startY = parseFloat(element.getAttribute("cy"))
    const textOffsetX = parseFloat(text.getAttribute("x")) - startX
    const textOffsetY = parseFloat(text.getAttribute("y")) - startY
    // could maybe switch this to use the requestanimationframe
    const id = setInterval(frame, 60 / 1000)

    function frame()
      {
        let currentX = parseFloat(element.getAttribute("cx"))
        let currentY = parseFloat(element.getAttribute("cy"))
        if (currentX === targetX && currentY === targetY)
          {
            clearInterval(id)
            element.setAttribute("cx", targetX)
            element.setAttribute("cy", targetY)
            text.setAttribute("x", currentX + textOffsetX)
            text.setAttribute("y", currentY + textOffsetY)
            updatePageContent(page, down)
          }
        else
          {
            currentX = linearlyInterpolate(currentX, targetX, 0.15)
            currentY = linearlyInterpolate(currentY, targetY, 0.15)
            element.setAttribute("cx", currentX)
            element.setAttribute("cy", currentY)
            text.setAttribute("x", currentX + textOffsetX)
            text.setAttribute("y", currentY + textOffsetY)
          }
      }
  }

function updatePage(state, down)
  {
    "use strict"
    const svgobject = document.getElementById("svgobject")
    if (svgobject)
      {
        const subDoc = getSVGDocument(svgobject)
        if (subDoc)
          {
            var circle
            var target
            var text
            switch (state)
              {
              case 1:
                circle = subDoc.getElementById("firstcircle")
                if (down)
                  {
                    target = subDoc.getElementById("firststart")
                  }
                else
                  {
                    target = subDoc.getElementById("firstend")
                  }
                text = subDoc.getElementById("firsttext")
                break
              case 2:
                circle = subDoc.getElementById("secondcircle")
                if (down)
                  {
                    target = subDoc.getElementById("secondstart")
                  }
                else
                  {
                    target = subDoc.getElementById("secondend")
                  }
                text = subDoc.getElementById("secondtext")
                break
              case 3:
                circle = subDoc.getElementById("thirdcircle")
                if (down)
                  {
                    target = subDoc.getElementById("thirdstart")
                  }
                else
                  {
                    target = subDoc.getElementById("thirdend")
                  }
                text = subDoc.getElementById("thirdtext")
                break
              case 4:
                circle = subDoc.getElementById("fourthcircle")
                if (down)
                  {
                    target = subDoc.getElementById("fourthstart")
                  }
                else
                  {
                    target = subDoc.getElementById("fourthend")
                  }
                text = subDoc.getElementById("fourthtext")
                break
              default:
                alert("code broke")
              }
            sortCircles(state)
            //radialAnimate(circle, target, text, state);
            animate(circle, target, text, state, down)
          }
      }
  }

var navigateHandler = ( function()
  {
    "use strict"
    let currentState = 0
    return function(page)
      {
        const validUp = currentState + 1
        const validDown = currentState
        if (validUp === page && validUp <= 4)
          {
            currentState = validUp
            updatePage(currentState, false)
          }
        else if (validDown === page && validDown !== 0)
          {
            updatePage(currentState, true)
            currentState = validDown - 1
          }
      }
  } )()

function getSVGDocument(embedding_element)
  {
    "use strict"
    if (embedding_element.contentDocument)
      {
        return embedding_element.contentDocument
      }
    else
      {
        let subDoc = null
        try
          {
            subDoc = embedding_element.getSVGDocument()
          }
        catch (e)
          {
            alert("Your browser probably doesn't support SVG")
          }
        return subDoc
      }
  }

function assignClickHandlers()
  {
    "use strict"
    const svgobject = document.getElementById("svgobject")
    if (svgobject)
      {
        const subDoc = getSVGDocument(svgobject)
        if (subDoc)
          {
            subDoc.getElementById("firstcircle").onclick = function()
              {
                navigateHandler(1)
              }
            subDoc.getElementById("secondcircle").onclick = function()
              {
                navigateHandler(2)
              }
            subDoc.getElementById("thirdcircle").onclick = function()
              {
                navigateHandler(3)
              }
            subDoc.getElementById("fourthcircle").onclick = function()
              {
                navigateHandler(4)
              }
          }
      }
  }

function loadFinished()
  {
    "use strict"
    //JQuery don't seem to work
    //$(document).on("click", ".st0", navigate);
    assignClickHandlers()
  }

$(window)
  .load(loadFinished)