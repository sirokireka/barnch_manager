const API_KEY =  `live_5CiIeyt9gQKck94h8dGaoTSXtL8YB9mmEPoS98NyDnJarvVD6dHG9yNgRvHeIpJx`;

interface Breed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
}

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
}

const img = document.querySelector("#catImage") as HTMLImageElement;
const breedName = document.querySelector("#breedName") as HTMLHeadingElement;
const button = document.querySelector("#newCatBtn") as HTMLButtonElement;

async function fetchCat(): Promise<CatImage | null> {
  try {
    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?has_breeds=true&limit=1",
      {
        method: "GET",
        headers: {
          "x-api-key": `live_5CiIeyt9gQKck94h8dGaoTSXtL8YB9mmEPoS98NyDnJarvVD6dHG9yNgRvHeIpJx` ,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) {
      console.error("HTTP hiba:", response.status);
      return null;
    }

    const data: CatImage[] = await response.json();
    return data[0] ?? null;

  } catch (error) {
    console.error("Hiba történt:", error);
    return null;
  }
}

function displayCat(cat: CatImage): void {
  img.src = cat.url;

  const breed = cat.breeds?.[0];

  if (breed) {
    breedName.textContent = breed.name;
  } else {
    breedName.textContent = "Ismeretlen fajta";
  }
}

async function loadCat(): Promise<void> {
  const cat = await fetchCat();

  if (cat) {
    displayCat(cat);
  } else {
    breedName.textContent = "Nem sikerült betölteni a macskát";
  }
}

// Eseménykezelő gombra
button.addEventListener("click", loadCat);


loadCat();


