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
    
}

export async function createUser(userInfo){
    const container = document.querySelector(".userInfo");
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

    for(const movie of movies) {
        let movieId = movie.imdb_id;
        let currentMovie = await getMovieOnId(movieId);
        contributedMovies.push(currentMovie);
    }
    return contributedMovies;
}

export function generateMovies(movies){
    const container = document.getElementById("myMovies");
    container.innerHTML="";

   for (const movie of movies) {
    const article = document.createElement("article");
    article.classList.add("flex-container", "ratedMovies")
    article.setAttribute("data-id", movie.imdb_id)

    const image = document.createElement("img");
    image.src = `${"https://image.tmdb.org/t/p/original"}${movie.poster_path}`;
    console.log("bilden skapas korrekt", image);
   
    

    const articleData = document.createElement("div");
    articleData.classList.add("flex-container", "ratings-wrapper");
    const imdbScore = movie.cmdb_score;
    
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




export function searchFunction() {
    // Hämta alla sökformulär på sidan
    const searchForms = document.querySelectorAll(".searchForm");
  
    // Loopa igenom varje sökformulär och lägg till en eventlyssnare
    searchForms.forEach(form => {
      form.querySelector(".searchInput").addEventListener("input", async function (e) {
        const query = e.target.value.trim();
        const suggestionsBox = form.querySelector(".searchSuggestions");
  
        if (query) { 
          try {
            const response = await fetch(`${baseUrl}s=${query}`);
            
            
            if (response.ok) {
              const data = await response.json();
              
              if (data.Response === "True") {
                displaySuggestions([data], suggestionsBox); 
              } else {
                suggestionsBox.innerHTML = "<div>No results found</div>"; 
                suggestionsBox.style.display = "block";
              }
            }
          } catch (error) {
            console.error("Network error occurred:", error);
          }
        } else {
          suggestionsBox.style.display = "none"; 
        }
      });
    });
  
    // Hantera submit-formulär på varje sökformulär
    const searchFormsSubmit = document.querySelectorAll(".searchForm");
    searchFormsSubmit.forEach(form => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const query = form.querySelector(".searchInput").value.trim();
        if (query) {
          window.location.href = `search.html?query=${encodeURIComponent(query)}`;
        }
      });
    });
  }
  
  function displaySuggestions(results, suggestionsBox) {
    suggestionsBox.innerHTML = "";
    results.forEach(movie => {
      const div = document.createElement("div");
      div.innerText = movie.Title;
      
      div.addEventListener("click", () => {
        window.location.href = `Details.html?id=${movie.imdbID}`;
      });
  
      suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = "block";
  }
  






