import { getGenres, getMovieOnId } from "./cmdb.js";
import { createStars } from "./data.js";
import { getMediaOnIdOmdb } from "./omdb.js";
import { configOmdb } from "./config.js";
import { filterOnGenre} from "./generes.js"
const baseUrl = configOmdb.omdbApi.baseUrl;

export async function generateGenresOnSearch(movies){
  const genres = await getGenres();
  const genreSelect = document.getElementById("genreSelect");
  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre.id; // Använd ID som värde
    option.textContent = genre.name; // Använd namn som visningstext
    genreSelect.appendChild(option);
    option.addEventListener("click", () => {
      let id = genre.id;
      let filteredMovies = filterOnGenre(movies, id);
      generateMovies(filteredMovies);
    })
  });

}



export async function generateMovies(movies) {
    let arrayMovies = movies.Search;
    console.log("sökta filmer", arrayMovies); 
    const container = document.getElementById("searchResults");
    container.innerHTML = ""; 
    
    // Loop through each movie in the array and create the HTML structure
    for (const movie of arrayMovies) {

       const id = movie.imdbID;
        let infoMovie = await getMediaOnIdOmdb(id);
        console.log("filmer efter titel", infoMovie);
        
        const article = document.createElement("article");
        article.classList.add("flex-container");
        article.setAttribute("id", movie.imdbID);

        const divImg = document.createElement("div");
        divImg.classList.add("flex-container", "flex-item");
        const image = document.createElement("img");
        image.src = `${infoMovie.Poster}`;
        image.alt = infoMovie.Title;
        
        // Add an event listener to redirect to the movie details page on click
        image.addEventListener("click", () => {
          window.location.href = `Details.html?id=${movie.imdbID}`;
        });
        divImg.appendChild(image);

        const divInfo = document.createElement("div");
        divInfo.classList.add("flex-container", "movieInfoAndRating");

        const title = document.createElement("h3");
        title.textContent = infoMovie.Title;

        const tagline = document.createElement("p");
        tagline.textContent = infoMovie.Plot || "Ingen beskrivning tillgänglig";

        divInfo.appendChild(title);
        divInfo.appendChild(tagline);

        article.appendChild(divImg);
        article.appendChild(divInfo);

        container.appendChild(article);

    }
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
            console.log("sökning svar", response);
            
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
            console.log(query);
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