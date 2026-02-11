const API_KEY = `live_5CiIeyt9gQKck94h8dGaoTSXtL8YB9mmEPoS98NyDnJarvVD6dHG9yNgRvHeIpJx`;
const img = document.querySelector("#catImage");
const breedName = document.querySelector("#breedName");
const button = document.querySelector("#newCatBtn");
// 1️⃣ FETCH
async function fetchCat() {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?has_breeds=true&limit=1", {
            method: "GET",
            headers: {
                "x-api-key": `live_5CiIeyt9gQKck94h8dGaoTSXtL8YB9mmEPoS98NyDnJarvVD6dHG9yNgRvHeIpJx`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            console.error("HTTP hiba:", response.status);
            return null;
        }
        const data = await response.json();
        return data[0] ?? null;
    }
    catch (error) {
        console.error("Hiba történt:", error);
        return null;
    }
}
// 2️⃣ MEGJELENÍTÉS
function displayCat(cat) {
    img.src = cat.url;
    const breed = cat.breeds?.[0];
    if (breed) {
        breedName.textContent = breed.name;
    }
    else {
        breedName.textContent = "Ismeretlen fajta";
    }
}
// 3️⃣ VEZÉRLŐ
async function loadCat() {
    const cat = await fetchCat();
    if (cat) {
        displayCat(cat);
    }
    else {
        breedName.textContent = "Nem sikerült betölteni a macskát";
    }
}
// Eseménykezelő gombra
button.addEventListener("click", loadCat);
// Első betöltés
loadCat();
export {};
/*
interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}
interface Breed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
}

fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", {
  method: "GET",
  headers: {
    "x-api-key": `live_5CiIeyt9gQKck94h8dGaoTSXtL8YB9mmEPoS98NyDnJarvVD6dHG9yNgRvHeIpJx`,
    "Content-Type": "application/json"
  }
})
.then(res => res.json())
  .then((data: CatImage[]) => {
    Megjelenit(data);
  });
function Megjelenit(data: CatImage[]) {
  const img = document.querySelector("img") as HTMLImageElement;

  if (data.length > 0) {
    img.src = data[0].url;

    if (data[0].breeds.length > 0) {
      console.log("Fajta:", data[0].breeds[0].name);
    }
  }
}*/ 
//# sourceMappingURL=main.js.map