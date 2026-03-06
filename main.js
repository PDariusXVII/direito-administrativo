let currentTopic = null
let currentTab = "aprender"

let studyProgress = {}
let fcIndex = {}
let fcFlipped = {}

function init(){

renderSidebar()

const topics = Object.keys(DA)

if(topics.length){
selectTopic(topics[0])
}

}

function switchTab(tab){

currentTab = tab
renderCurrentView()

}

function renderCurrentView(){

if(!currentTopic) return

if(currentTab === "aprender") renderAprender()

if(currentTab === "mapa") renderMapa()

if(currentTab === "flashcards") renderFlashcards()

if(currentTab === "quiz") renderQuiz()

}

window.onload = init
