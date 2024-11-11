

function createStars(){
    const starDiv = document.createElement("div");
    starDiv.classList.add(".ratings");
}

export function generateMovies(movies){
    const conatiner = document.getElementById("containerRatedMovies");
    conatiner.innerHTML="";

    //Skapa en article
   for (const movie of movies) {
    const article = document.createElement("article");
    article.setAttribute("data-id", movie.imdb_id)
    
    const image = document.createElement("img");
    image.src = `${"https://image.tmdb.org/t/p/original"}${movie.poster_path}`;
    article.appendChild(image);
    const articleData = document.createElement("div");
    articleData.classList.add("ratings-wrapper");
    const movieScore = document.createElement("div");
    movieScore.classList.add("ratings");
    /*Lägga till create stars här på något sätt, ska ju ligga i den containern */
   }
}

