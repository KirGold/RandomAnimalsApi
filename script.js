const animalApis = [
    'https://some-random-api.ml/animal/dog',
    'https://some-random-api.ml/animal/cat'
]

const factContainer = document.getElementById("fact-container")
const loadingIndicator = document.getElementById("loading")

//Function to take fact
function fetchRandomFact() {
    const randomApi = animalApis[Math.floor(Math.random() * animalApis.length)]
    return fetch(randomApi)
        .then(response => {
            if (!response.ok) {
                throw new Error(`ERROR`)
            }
            return response.json()
        })
        .catch(error => {
            console.error("Fetch error:", error)
            return null
        })
}

// Function to SHOW fact
function displayFact(factData) {
    if (!factData) return

    let factCard = document.createElement("div")
    factCard.className = "fact-card"
    factCard.innerHTML = `
        <img src="${factData.image}" alt="Animal Image">
        <p>${factData.fact}</p>
    `;
    factContainer.appendChild(factCard)
}

function loadFacts() {
    loadingIndicator.style.display = "block"

    fetchRandomFact()
        .then(factData => {
            if (factData) {
                displayFact(factData)
            }
        })
        .finally(() => {
            loadingIndicator.style.display = "none"
        })
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadFacts()
    }
})


loadFacts()
