import {createStars} from "./data.js"
import { configOmdb } from "./config.js";
const baseUrl = configOmdb.omdbApi.baseUrl;



export function generateMovies(movies){
    let arrayMovies = movies.data;
    console.log(arrayMovies);
    const container = document.getElementById("topTenMovies");
    container.innerHTML="";

    for (const movie of arrayMovies) {
        const article = document.createElement("article");
        article.classList.add("flex-container", "topTen")
        article.setAttribute("id", movie.imdb_id)
    
        const divImg = document.createElement("div");
        divImg.classList.add("flex-container", "flex-item", "posterImage");
        const image = document.createElement("img");
        image.src = `${"https://image.tmdb.org/t/p/original"}${movie.poster_path}`;
        image.addEventListener("click", () => {
            window.location.href = `Details.html?id=${movie.imdb_id}`;
        })
        divImg.appendChild(image);

        const divInfo = document.createElement("div");
        divInfo.classList.add("flex-container", "movieInfoAndRating");
        const title = document.createElement("h3");
        title.textContent = movie.title;
        const tagline = document.createElement("p");
        tagline.textContent = movie.tagline;
        const articleData = document.createElement("div");
        articleData.classList.add("flex-container", "ratings-wrapper");
        const imdbScore = movie.cmdb_score;
        const starDiv = createStars(imdbScore);

        
        divInfo.appendChild(title);
        divInfo.appendChild(starDiv);
       divInfo.appendChild(tagline);
       
        article.appendChild(divImg);
        article.appendChild(divInfo);
        container.appendChild(article);
    }    
   
}

export function generateSeries(movies){
    let arrayMovies = movies.data;
    const container = document.querySelectorAll(".top10ListSeries");
    

    container.forEach(container => {
        container.innerHTML = "";
    for (const movie of arrayMovies) {
        const article = document.createElement("article");
        article.classList.add("flex-container", "topTen")
        article.setAttribute("id", movie.imdb_id)
    
        const divImg = document.createElement("div");
        divImg.classList.add("flex-container", "flex-item", "posterImage");
        const image = document.createElement("img");
        image.src = `${"https://image.tmdb.org/t/p/original"}${movie.poster_path}`;
        image.addEventListener("click", () => {
            window.location.href = `Details.html?id=${movie.imdb_id}`;
        })
        divImg.appendChild(image);

        const divInfo = document.createElement("div");
        divInfo.classList.add("flex-container", "movieInfoAndRating");
        const title = document.createElement("h3");
        title.textContent = movie.title;
        const tagline = document.createElement("p");
        tagline.textContent = movie.tagline;
        const articleData = document.createElement("div");
        articleData.classList.add("flex-container", "ratings-wrapper");
        const imdbScore = movie.cmdb_score;
        const starDiv = createStars(imdbScore);

        
        divInfo.appendChild(title);
        divInfo.appendChild(starDiv);
       divInfo.appendChild(tagline);
       
        article.appendChild(divImg);
        article.appendChild(divInfo);
        container.appendChild(article);
    }    
    })
    

   
}

export function generateTopList(movies) {
    let arrayMovies = movies.data;
    const container = document.getElementById("topList");
    container.innerHTML = "";

    for (let index = 0; index < 3; index++) {
        const movie = arrayMovies[index];
        
        const article = document.createElement("article");
        article.classList.add("flex-container");
        article.setAttribute("id", movie.imdb_id);
        
        if (index === 0) {
            article.classList.add("topMovie");
        } else {
            article.classList.add("topMovies");
        }
        
        const divImg = document.createElement("div");
        divImg.classList.add("flex-container", "flex-item", "posterImage");
        const image = document.createElement("img");
        image.src = `${"https://image.tmdb.org/t/p/original"}${movie.poster_path}`;
        image.alt = `Bild av ${movie.title}`;

        image.addEventListener("click", () => {
            window.location.href = `Details.html?id=${movie.imdb_id}`;
        })
        divImg.appendChild(image);

        const divInfo = document.createElement("div");
        divInfo.classList.add("flex-container", "movieInfoAndRating");
        const title = document.createElement("h3");
        title.textContent = movie.title || "Utan titel";
        const tagline = document.createElement("p");
        tagline.textContent = movie.tagline || "Ingen info tillgänglig";
        const imdbScore = movie.cmdb_score || 0;

        // Skapa klickbar starDiv med isClickable = true
        const starDiv = createStars(imdbScore, true);

        divInfo.appendChild(title);
        divInfo.appendChild(starDiv);
        divInfo.appendChild(tagline);
       
        article.appendChild(divImg);
        article.appendChild(divInfo);

        // Appendera artikeln korrekt i DOM beroende på dess position
        if (index === 1 || index === 2) {
            const wrapperDiv = document.createElement("div");
            wrapperDiv.classList.add("flex-container", "topTwoAndThree");
            wrapperDiv.appendChild(article);
            container.appendChild(wrapperDiv);
        } else {
            container.appendChild(article);
        }
    }
}

function closeModal() {
    const ratingModal = document.getElementById("ratingModal");
    ratingModal.style.display = "none";
    const stars = document.querySelectorAll("#starRating .star");
    stars.forEach(star => star.classList.remove("selected"));
}

document.getElementById("closeModal").addEventListener("click", closeModal);

export function searchFunction() {
    document.getElementById("searchInput").addEventListener("input", async function (e) {
      const query = e.target.value.trim();
      const suggestionsBox = document.getElementById("searchSuggestions");
  
      if (query) { // Check if the query is not empty
        try {
          // Use the 't' parameter for searching by movie title
          const response = await fetch(`${baseUrl}s=${query}`);
          console.log("sökning svar", response);
          
          if (response.ok) {
            const data = await response.json();
            
            // If the movie is found, display it, otherwise show no results
            if (data.Response === "True") {
              displaySuggestions([data]); // Send the movie data in an array for display
            } else {
              suggestionsBox.innerHTML = "<div>No results found</div>"; // Show a "no results" message
              suggestionsBox.style.display = "block";
            }
          }
        } catch (error) {
          console.error("Network error occurred:", error);
        }
      } else {
        suggestionsBox.style.display = "none"; // Hide suggestions when the input is empty
      }
    });
}

function displaySuggestions(results) {
    const suggestionsBox = document.getElementById("searchSuggestions");
    suggestionsBox.innerHTML = "";
    results.forEach(movie => {
      const div = document.createElement("div");
      div.innerText = movie.Title;
      
      // Om användaren klickar på ett förslag, omdirigerar till Details.html med IMDb-ID
      div.addEventListener("click", () => {
        window.location.href = `Details.html?id=${movie.imdbID}`;
      });
  
      suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = "block";
  }



  document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("searchInput").value.trim();
    if (query) {
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  });



