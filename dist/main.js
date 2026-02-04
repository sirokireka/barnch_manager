const API_KEY = "SAJAT_API_KEY";
fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", {
    method: "GET",
    headers: {
        "x-api-key": `live_5CiIeyt9gQKck94h8dGaoTSXtL8YB9mmEPoS98NyDnJarvVD6dHG9yNgRvHeIpJx`,
        "Content-Type": "application/json"
    }
})
    .then(res => res.json())
    .then(data => {
    console.log(data);
});
export {};
//# sourceMappingURL=main.js.map