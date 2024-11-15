import {createStars} from "../modules/data.js"
import { sendReviewToServer } from "./cmdb.js";


export function generateMovie(movie) {
    const container = document.getElementById("detailsMovie");
    container.innerHTML = "";  // Rensar innehållet innan vi lägger till filmen

    const article = document.createElement("article");
    article.classList.add("flex-container", "topMovie");
    article.setAttribute("id", movie.cmdb_id);
    

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("flex-container", "flex-item");

    const image = document.createElement("img");
    image.src = movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : "path/to/placeholder.jpg";
    imageDiv.appendChild(image);

    const articleInfo = document.createElement("div");
    articleInfo.classList.add("flex-container", "movieInfoAndRating");

    const headline = document.createElement("h3");
    headline.textContent = movie.title || "Titel saknas";
    console.log(headline);

    const genresContainer = document.createElement("div");
    genresContainer.classList.add("shortInfoOnMovie", "flex-container");

    // Kontrollerar om genres existerar innan vi loopar igenom dem
    if (movie.genres && movie.genres.length > 0) {
        movie.genres.forEach(genre => {
            const genreElement = document.createElement("p");
            genreElement.textContent = genre.name;
            genresContainer.appendChild(genreElement);
        });
    } else {
        const noGenreElement = document.createElement("p");
        noGenreElement.textContent = "Genre saknas";
        genresContainer.appendChild(noGenreElement);
    }

    const statistics = document.createElement("p");
    statistics.textContent = `År: ${movie.release_date || "Okänt"}`;
    
    const content = document.createElement("p");
    content.textContent = movie.overview || "Ingen beskrivning tillgänglig.";

    const articleData = document.createElement("div");
    articleData.classList.add("flex-container", "ratings-wrapper");

    // Ger ett standardvärde till createStars-funktionen om cmdbScore saknas
    const cmdbScore = movie.cmdb_score || 0;
    const starDiv = createStars(cmdbScore);

    articleInfo.appendChild(headline);
    articleInfo.appendChild(genresContainer);
    articleInfo.appendChild(statistics);
    articleInfo.appendChild(starDiv);
    articleInfo.appendChild(content);

    article.appendChild(imageDiv);
    article.appendChild(articleInfo);
    article.appendChild(articleData);

    container.appendChild(article);    
}

export function generateActors(movie){
    const container = document.getElementById("actorsDiv");
    container.innerHTML ="";

    let actors = movie.cast;
    actors.forEach(actor => {
        const actorDiv = document.createElement("div");
        actorDiv.classList.add("flex-container", "actor");
        const image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/original${actor.profile_path}`;
        const name = document.createElement("p");
        name.textContent = actor.name;
        actorDiv.appendChild(image);
        actorDiv.appendChild(name);
        container.appendChild(actorDiv);
    })
    
}



export function getReviews(movie) {
    const container = document.getElementById("userReviews");
    container.innerHTML = "";

    if (!movie.reviews || movie.reviews.length === 0) {
        const noReviewsMessage = document.createElement("p");
        noReviewsMessage.textContent = "No reviews available yet.";
        container.appendChild(noReviewsMessage);
        console.log(noReviewsMessage);
        return; 
    }

    let userReviews = movie.reviews; 
    userReviews.forEach(review => {
       const reviewDiv = document.createElement("div");
       reviewDiv.classList.add("flex-container", "userReview");

        const movieTitle = document.createElement("h3");
        movieTitle.textContent = review.title || "Utan titel";
        const userContent = document.createElement("p");
        userContent.textContent = review.content || "Inget innehåll.";
        const cmdbScore = review.cmdb_score || 0;
        const starDiv = createStars(cmdbScore);
        reviewDiv.appendChild(movieTitle);
        reviewDiv.appendChild(starDiv);
        reviewDiv.appendChild(userContent);
        container.appendChild(reviewDiv);

    })
}

let selectedRating = null;

// Hantera betygsval
export function ratingButton() {
    document.querySelectorAll(".btnRating").forEach(button => {
        button.addEventListener("click", function () {
            selectedRating = this.getAttribute("data-rating");  // Spara betyget från knappen
            console.log("Valt betyg:", selectedRating);

            // Avmarkera alla knappar och markera den valda
            document.querySelectorAll(".btnRating").forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
}

// Hantera formulärinlämning
export function inputForm() {
    const form = document.getElementById("reviewForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();  // Förhindra formuläret från att skickas direkt

        const name = document.getElementById("nameTxt").value;
        const date = document.getElementById("date").value;
        const reviewText = document.getElementById("recensionText").value;

        // Kontrollera att alla fält är ifyllda
        if (!name || !date || !reviewText || !selectedRating) {
            alert("Vänligen fyll i alla fält och välj ett betyg.");
            return;
        }

        // Skapa en recension
        const newReview = {
            imdb_id: form.dataset.imdbId,  // Hämta IMDb ID från data-attribut på formuläret
            cmdb_score: selectedRating,  // Betyget från användaren
            title: name,  // Namnet på användaren
            content: reviewText  // Själva recensionen
        };

        // Skicka recensionen till servern
        try {
            await sendReviewToServer(newReview);
            alert("Recensionen har skickats!");
            form.reset();  // Återställ formuläret efter inskick
            selectedRating = null;  // Återställ betygsvalet
        } catch (error) {
            console.error("Fel vid sändning av recension", error);
        }
    });
}


