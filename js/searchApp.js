import { generateMovies } from "../modules/uiSearch.js";
import { getMediaOnTitel } from "../modules/omdb.js";
import { generateGenresOnSearch } from "../modules/uiSearch.js";
import { searchFunction } from "../modules/searchfunction.js";

let movies = [];

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    console.log("skickas rätt",query);
    searchFunction();
    

    movies = await getMediaOnTitel(query);
    console.log("filmer", movies);
    if (query) {
       generateMovies(movies);
       
       //await generateGenresOnSearch(movies);
       //filterOnGenre(movies, genreId);
        console.log("No query provided");
    }
});