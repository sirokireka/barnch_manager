let score = 0;
let correctIndex = 0;
let currentCats = [];
// DOM elemek
const imgElements = Array.from(document.querySelectorAll(".cat-pictures img"));
const breedElement = document.querySelector("#catbreed");
const counterElement = document.querySelector("#counter b");
const starterButton = document.querySelector("#starter");
// API kulcs
const API_KEY = "live_5CiIeyt9gQKck94h8dGaoTSXtL8YB9mmEPoS98NyDnJarvVD6dHG9yNgRvHeIpJx";
// API hívás
async function fetchCats() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?has_breeds=true&limit=3", {
        headers: {
            "x-api-key": `live_5CiIeyt9gQKck94h8dGaoTSXtL8YB9mmEPoS98NyDnJarvVD6dHG9yNgRvHeIpJx`,
            "Content-Type": "application/json",
        },
    });
    if (!response.ok)
        throw new Error("Hiba az API-nál");
    const data = await response.json();
    return data;
}
// Inicializálás
function init() {
    starterButton.addEventListener("click", startGame);
    imgElements.forEach(img => {
        img.addEventListener("click", async () => {
            const i = parseInt(img.dataset.index);
            handleClick(i);
            if (score < 5) { // ha még nincs meg az 5 pont
                await nextRound();
            }
        });
    });
}
init();
// Segédfüggvények
function randomIndex(length) {
    return Math.floor(Math.random() * length);
}
function updateImages(urls) {
    imgElements.forEach((img, i) => {
        img.src = urls[i];
        img.dataset.index = i.toString();
    });
}
function updateBreed(name) {
    breedElement.textContent = name;
}
function updateCounter(value) {
    counterElement.textContent = value.toString();
}
function showMessage(message) {
    alert(message);
}
// Játék kör beállítása
function setupRound(cats) {
    currentCats = [...cats];
    // Véletlenszerűen kiválasztjuk a "helyes" képet
    correctIndex = randomIndex(currentCats.length);
    const correctBreed = currentCats[correctIndex].breeds[0].name;
    // Shuffle a tömbön
    for (let i = currentCats.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // TypeScript biztosítás: mindkét elem létezik
        const tempI = currentCats[i];
        const tempJ = currentCats[j];
        currentCats[i] = tempJ;
        currentCats[j] = tempI;
        if (i === correctIndex)
            correctIndex = j;
        else if (j === correctIndex)
            correctIndex = i;
    }
    const urls = currentCats.map(c => c.url);
    updateImages(urls);
    updateBreed(correctBreed);
}
// Kép kattintás kezelése
function handleClick(index) {
    if (index === correctIndex) {
        score++;
        updateCounter(score);
        if (score >= 5) {
            showMessage("Nyertél! Nyomj a Kezdés gombra az új játékhoz");
            return;
        }
    }
    else {
        showMessage("Rossz válasz!");
    }
}
async function nextRound() {
    const cats = await fetchCats();
    setupRound(cats);
}
async function startGame() {
    score = 0;
    updateCounter(score);
    await nextRound();
}
export {};
//# sourceMappingURL=main.js.map