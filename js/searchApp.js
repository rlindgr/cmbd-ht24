import { generateMovies } from "../modules/uiSearch.js";
import { getMediaOnTitel } from "../modules/omdb.js";
let movies = [];

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    console.log("skickas rätt",query);

    movies = await getMediaOnTitel(query);
    console.log("filmer", movies);
    if (query) {
       generateMovies(movies);
       
        console.log("No query provided");
    }
});