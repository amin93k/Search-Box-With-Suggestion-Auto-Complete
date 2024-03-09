const suggestions = [
    "Channel", "CodingLab", "CodingNepal", "YouTube", "YouTuber", "YouTube Channel", "Blogger", "Bollywood", "Vlogger", "Vechiles", "Facebook", "Freelancer", "Facebook Page", "Designer", "Developer", "Web Designer", "Web Developer", "Login Form in HTML & CSS", "How to learn HTML & CSS", "How to learn JavaScript", "How to become Freelancer", "How to become Web Designer", "How to start Gaming Channel", "How to start YouTube Channel", "What does HTML stands for?", "What does CSS stands for?"
]

const $ = document
const search = $.querySelector(".search-input")
const suggestUl = $.querySelector(".suggest")
// variable to regular suggest li
let hoverNum = -1


function searchSuggestion(event) {
    // empty suggestUl
    suggestUl.innerHTML = ''

    const letter = search.value.toLowerCase().trim()
    let suggestList
    // temp for save new Li
    const fragment = new DocumentFragment()
    // if search box input doesn't empty
    if (letter) {
        // find suggest phrase and save to list
        suggestList = suggestions.filter(phrase => {
            return phrase.toLowerCase().includes(letter)
        })
        // creat new Li element
        suggestList.forEach((item, index) => {
            const newLi = $.createElement("li")
            newLi.className = "suggest-li"
            newLi.textContent = item
            newLi.dataset.hover = index.toString()
            fragment.append(newLi)
        })
    }

    suggestUl.append(fragment)
    // display suggestion list
    if (!suggestUl.classList[1]) {
        suggestUl.className = "suggest active"
    }

    // move with arrow up or down in suggests
    if (event.key === "ArrowUp" && suggestList) {
        movementOnSuggests (event.key, event)
    }
    else if (event.key === "ArrowDown" && suggestList) {
        movementOnSuggests (event.key, event)
    }

    // when show new suggestion hover number refresh
    if (event.key === "Backspace") {
        hoverNum = -1
    }
    // when enter key press get Li content and put to input
    if (event.key === "Enter") {
        selectAndCloseSuggest(suggestUl.children[hoverNum] || null)
    }

    scrollWithArrowKey()
}

function selectAndCloseSuggest(event) {
    let target
    // check event parameter to know click or enter on suggest
    if (event.target) {
        target = event.target
    }else {
        target = event
    }
    // close suggests list
    if (target.classList.contains("suggest-li")) {
        suggestUl.classList.toggle("active")
        search.value = target.textContent
    }
    else if (!target.classList.contains("search-input")) {
        suggestUl.className = "suggest"
    }
}

function movementOnSuggests (arrow) {
    // list of suggestion Ul children
    const suggElm = suggestUl.children
    // movement with arrow down and up key on suggestion list
    if (arrow === "ArrowDown") {
        if (hoverNum > suggElm.length -2) {
            hoverNum = -1
        }

        hoverNum++
        // set style bg for active suggest
        suggElm[hoverNum].style.backgroundColor = "#e0e0e0"
    }
    else {
        hoverNum --

        if (hoverNum < 0) {
            hoverNum = suggElm.length -1
        }

        suggElm[hoverNum].style.backgroundColor = "#e0e0e0"
    }
}

function adjustmentHoverOnSuggest(event) {
    // when hover mouse on the suggestion list remove additional bg style from suggest
    if (hoverNum > -1) {
        event.target.children[hoverNum].style.backgroundColor = ""
    }
}

function scrollWithArrowKey() {

    // check occurred scroll in suggest list
    if (hoverNum >= 0 && suggestUl.scrollHeight > suggestUl.clientHeight) {

        // take children position based on Ul Element
        const location = suggestUl.children[hoverNum].offsetTop
        // height of each Li element
        const liHeight = suggestUl.children[0].offsetHeight

        const scrollTop = suggestUl.scrollTop
        const clientHeight = suggestUl.clientHeight
        const ulHeight = suggestUl.scrollHeight

        // when arrow key up press
        if (location - liHeight < scrollTop) {
            suggestUl.scrollTo(0, location - liHeight * 2);
        } // when arrow key down press
        else if (location + liHeight > scrollTop + clientHeight) {
            suggestUl.scrollTo(0, location + liHeight - clientHeight);
        }

        // when scroll at the end and arrow down key press
        if (hoverNum === 0) {
            suggestUl.scrollTo(0, 0)
        }
        // when scroll at the top and arrow up key press
        if (hoverNum + 1 === suggestUl.children.length) {
            suggestUl.scrollTo(0, ulHeight)
        }
    }
}

search.addEventListener("keyup", searchSuggestion)
$.documentElement.addEventListener("click", selectAndCloseSuggest)
suggestUl.addEventListener("mouseenter", adjustmentHoverOnSuggest)
