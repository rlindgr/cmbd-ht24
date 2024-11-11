import{createStars} from "../modules/data.js"; 
import { generatePoppe } from "../modules/data.js";
import {generateMovieStatistics} from "../modules/data.js"
import {generateSeriesStatistics} from "../modules/data.js"
import { displayGeneres } from "./generes.js";
import {genresPercent} from "./generes.js";



export function generateMovies(movies){
    const container = document.getElementById("containerRatedMovies");
    container.innerHTML="";

   for (const movie of movies) {
    const article = document.createElement("article");
    article.classList.add("flex-container", "ratedMovies")
    article.setAttribute("data-id", movie.imdb_id)

    const image = document.createElement("img");
    image.src = `${"https://image.tmdb.org/t/p/original"}${movie.poster_path}`;
    

    const articleData = document.createElement("div");
    articleData.classList.add("flex-container", "ratings-wrapper");
    const imdbScore = movie.contribution.cmdb_score;
    const starDiv = createStars(imdbScore);
   
    article.appendChild(image);
    articleData.appendChild(starDiv);
    article.appendChild(articleData);
    container.appendChild(article);    
   }
}

export async function generateUserStatistcs(movies) {
    const container = document.getElementById("userStatistics");
    container.innerHTML="";

    const poppe = generatePoppe(movies);
    const movieStatistics = generateMovieStatistics(movies);
    const seriesStatistics = generateSeriesStatistics(movies);

    container.appendChild(poppe);
    container.appendChild(movieStatistics);
    container.appendChild(seriesStatistics);
}

export async function generateFilters(movies) {
    const container = document.getElementById("progressBars");
    container.innerHTML="";

    const genres = displayGeneres(movies);
    genres.forEach(genre => {
        const progressBarDiv = genre;
        container.appendChild(progressBarDiv);

    });
    genresPercent(movies);
}





