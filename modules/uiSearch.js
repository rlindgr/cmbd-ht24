import { getMovieOnId } from "./cmdb.js";
import { createStars } from "./data.js";
import { getMediaOnIdOmdb } from "./omdb.js";


async function getMovieData(id) {
    const movieFromCmd = await getMovieOnId(id);
       if(movieFromCmd) {
        console.log("hämtade från CMD", movieFromCmd);
        return movieFromCmd;
       } else {
        const movieFromOmdb = await getMediaOnIdOmdb(id);
        return movieFromOmdb;
       }
}

export function generateMovies(movies) {
    let arrayMovies = movies.Search;
    console.log(arrayMovies); 
    const container = document.getElementById("searchResults");
    container.innerHTML = ""; 
    
    // Loop through each movie in the array and create the HTML structure
    for (const movie of arrayMovies) {

       const id = movie.imdbID;
        getMovieData(id);
        
        const article = document.createElement("article");
        article.classList.add("flex-container");
        article.setAttribute("id", movie.imdbID);

        const divImg = document.createElement("div");
        divImg.classList.add("flex-container", "flex-item");
        const image = document.createElement("img");
        image.src = `${movie.Poster}`;
        image.alt = movie.Title;
        
        // Add an event listener to redirect to the movie details page on click
        image.addEventListener("click", () => {
            window.location.href = `Details.html?id=${movie.imdbID}`;
        });
        divImg.appendChild(image);

        // Create the container for movie info (title, description, rating)
        const divInfo = document.createElement("div");
        divInfo.classList.add("flex-container", "movieInfoAndRating");
        
        // Movie title
        const title = document.createElement("h3");
        title.textContent = movie.Title;
        
        // Movie tagline or description
        const tagline = document.createElement("p");
        tagline.textContent = movie.overview || "Ingen beskrivning tillgänglig"; // Default text if no description
        console.log(tagline);

        // Create a wrapper for the ratings (this could use a function to create stars)
        const articleData = document.createElement("div");
        articleData.classList.add("flex-container", "ratings-wrapper");
        const imdbScore = movie.imdbRating; 
        const starDiv = createStars(imdbScore); 

        // Append the title, rating, and tagline to the info container
        divInfo.appendChild(title);
        divInfo.appendChild(starDiv); // Star rating
        divInfo.appendChild(tagline); // Tagline or description

        // Append image and info to the article container
        article.appendChild(divImg);
        article.appendChild(divInfo);

        // Append the movie article to the main container
        container.appendChild(article);
    }
}