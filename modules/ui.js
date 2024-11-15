import{createStars} from "../modules/data.js"; 
import { generatePoppe } from "../modules/data.js";
import {generateMovieStatistics} from "../modules/data.js"
import {generateSeriesStatistics} from "../modules/data.js"
import { displayGeneres } from "./generes.js";
import {genresPercent} from "./generes.js";
import { getGenres } from "./cmdb.js";
import {getUserContribution} from "./cmdb.js"
import { getMovieOnId } from "./cmdb.js";


export async function generateGenres(){
    const genres = await getGenres();
    console.log(genres);
}

export async function createUser(userInfo){
    const container = document.getElementById("userContainer");
    container.innerHTML="";

    const div = document.createElement("div");
    div.classList.add("flex-container", "userInfo");
    const image = document.createElement("img");
    image.setAttribute("id", "userPic");
    image.src = userInfo.avatar;
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("flex-container");
    nameDiv.setAttribute("id", "userName");
    const nameTxt = document.createElement("h3");
    nameTxt.textContent = `${userInfo.firstname} ${userInfo.lastname}`;


    nameDiv.appendChild(nameTxt);
    div.appendChild(image);
    div.appendChild(nameDiv);
    container.appendChild(div);

}

export async function generateUserContributions(userId) {
    const contribution = await getUserContribution(userId);
    let movies = contribution.value;
    const contributedMovies = [];
    console.log("filmer som bidragits till", movies);

    for(const movie of movies) {
        let movieId = movie.imdb_id;
        let currentMovie = await getMovieOnId(movieId);
        contributedMovies.push(currentMovie);
    }

    generateMovies(contributedMovies);
    console.log("lista av filmer", contributedMovies)
    return contributedMovies;
}

export function generateMovies(movies){
    const container = document.getElementById("containerRatedMovies");
    if (!container) {
        console.error("Elementet med id 'containerRatedMovies' hittades inte.");
        return;
    }
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

export function filterMoviesBySearchInput(movies){
    const searchInput = document.querySelector("#search");
    const searchResultContainer = document.querySelector("#searchResults");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        searchResultContainer.innerHTML = "";
        if(!query) return;
        const filteredMovies = movies.filter((movie) => 
        movie.title.toLowerCase().includes(query)
    );
    generateMoviesOnSearch(filteredMovies, query);
    })
}







