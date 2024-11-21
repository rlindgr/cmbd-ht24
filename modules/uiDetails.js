import {createStars} from "../modules/data.js"
import { getUserContribution, reviewMedia } from "./cmdb.js";
import { configOmdb } from "./config.js";
import { generateUserContributions } from "./ui.js";
import { updateReview } from "./cmdb.js";
import {deleteReview} from "./cmdb.js";
import { alertUser, confirmation } from "./alertMessage.js";
const baseUrl = configOmdb.omdbApi.baseUrl;
let selectedRating = null;


export async function generateMovie(movie) {
  
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
    

    const genresContainer = document.createElement("div");
    genresContainer.classList.add("shortInfoOnMovie", "flex-container");

   

    // Kontrollerar om genres existerar innan vi loopar igenom dem
    if (movie.genres && movie.genres.length > 0) {
        movie.genres.forEach(genre => {
            const genreElement = document.createElement("p");
            genreElement.setAttribute("id", "genresDetailedMovie")
            genreElement.textContent = genre.name;
            genresContainer.appendChild(genreElement);
        });
    } else {
        const noGenreElement = document.createElement("p");
        noGenreElement.textContent = "Genre saknas";
        genresContainer.appendChild(noGenreElement);
    }

    const statistics = document.createElement("p");
    statistics.textContent = `Datum: ${movie.release_date || movie.last_air_date}`;
    
    const content = document.createElement("p");
    content.textContent = movie.overview || "Ingen beskrivning tillgänglig.";

    const articleData = document.createElement("div");
    articleData.classList.add("flex-container", "ratings-wrapper");

    // Ger ett standardvärde till createStars-funktionen om cmdbScore saknas
    const cmdbScore = movie.cmdb_score || 0;
    const starDiv = createStars(cmdbScore);

    articleInfo.appendChild(headline);
    if(movie.media_type === "TVSeries") {
      const seasons = document.createElement("p");
      seasons.setAttribute("id", "seasons");
      seasons.textContent =`Antal säsonger: ${movie.number_of_seasons}`;
      articleInfo.appendChild(seasons)};
     articleInfo.appendChild(genresContainer);
     articleInfo.appendChild(statistics);
     articleInfo.appendChild(starDiv);
     articleInfo.appendChild(content);

    article.appendChild(imageDiv);
    article.appendChild(articleInfo);
    article.appendChild(articleData);

    container.appendChild(article);  
    console.log(movie);  
}

export function generateActors(movie){
    const container = document.getElementById("actorsDiv");
    container.innerHTML ="";

    let actors = movie.cast;
    if (!actors || actors.length === 0) {
        const noActorsMsg = document.createElement("p");
        noActorsMsg.textContent = "Inga skådespelare tillgängliga för denna film.";
        container.appendChild(noActorsMsg);
        return;
    }

    // Begränsa till 5 skådespelare
   // const limitedActors = actors.slice(0, 5);

    const scrollContainer = document.createElement("div");
    scrollContainer.classList.add("scroll-container");

    actors.forEach(actor => {
        const actorDiv = document.createElement("div");
        actorDiv.classList.add("flex-container", "actor");
        const image = document.createElement("img");
        image.src = `https://image.tmdb.org/t/p/original${actor.profile_path}`;
        const name = document.createElement("p");
        name.textContent = actor.name;
        actorDiv.appendChild(image);
        actorDiv.appendChild(name);
        scrollContainer.appendChild(actorDiv);
        container.appendChild(scrollContainer);
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

export async function inputForm(movie) {
  let contributedMoviesArray = await getUserContribution();  
  let contributedMovies = contributedMoviesArray.value;
  const currentMovieId = movie.imdb_id;
    console.log("currentMovieId", currentMovieId);
    console.log("Betygsatta filmer", contributedMovies);
    const form = document.getElementById("reviewForm");

    let movieFound = false;

    contributedMovies.forEach(existingMovie => {
      let id = existingMovie.imdb_id;
  
      if (id === currentMovieId) {
        movieFound = true;
        console.log("Du har redan betygsatt filmen", id);
        form.innerHTML = ""; 
  
        if (existingMovie.has_reviewed) {
            console.log("har reviewd");
           hasReviewd(form, existingMovie);
  
        } else if (existingMovie.has_rated) {
          displayRateOnlyForm(form, existingMovie);
        
        }
  
      }
  
    });

    if (!movieFound) {
      handleNewReviewForm(form, movie);
    }
  
}


function clearForm() {
    document.getElementById("titleTxt").value = ""; 
    document.getElementById("recensionText").value = "";
    selectedRating = null;
}
  


function renewForm(form, existingMovie) {
  form.innerHTML = ""; 
  form.innerHTML = `
  <div class="containerBtnRating flex-container" id="setCmdbScore">
      <button class="btnRating" id="btnNegative" data-rating="-1">-1</button>
      <button class="btnRating" id="btn1" data-rating="1">1</button>
      <button class="btnRating" id="btn2" data-rating="2">2</button>
      <button class="btnRating" id="btn3" data-rating="3">3</button>
      <button class="btnRating" id="btn4" data-rating="4">4</button>
      <button class="btnRating" data-rating="5">5</button>
  </div>
  <label for="Titel">Titel</label>
  <input type="text" id="titleTxt" name="nameTxt" placeholder="Titel på din recension..." value="${existingMovie.title || ``}">
  <br/>
  <label for="recensionText">Information</label>
  <input type="text" id="recensionText" name="recensionText" placeholder="Berätta för oss vad du tyckte om filmen!" value="${existingMovie.content || ``}">
  <br/>
  <input type="submit" value="Uppdatera recension">
  `;

  btnAssignClass(existingMovie);
}

function btnAssignClass(existingMovie) {
  const buttons = document.querySelectorAll(".btnRating")
  buttons.forEach(button => {
    if (button.getAttribute("data-rating") == existingMovie.cmdb_score) {
      button.classList.add("selected");
    }
  });

 selectedRating = existingMovie.cmdb_score; // Förifyll det tidigare betyget
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            buttons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedRating = button.getAttribute("data-rating");
            console.log("Valt betyg", selectedRating);
        });
    });

}

function submitForm(form, existingMovie) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    

    const name = document.getElementById("titleTxt").value;
    const reviewText = document.getElementById("recensionText").value;
    const imdbId = existingMovie.imdb_id;
    console.log("se om värden sparas korrekt", name, reviewText)
    

    if (!name || !reviewText || !selectedRating) {
     let message = "Du måste fylla i alla fälten";
     alertUser(message);
      return;
  }

    const updatedReview = {
      cmdbScore: parseInt(selectedRating, 10),
      title: name,
      content: reviewText,
    };

    try {
      console.log(imdbId, updatedReview, "Detta skickas till api vid updatering")
      await updateReview(imdbId, updatedReview);
      form.innerHTML ="";
      hasReviewd(form, existingMovie);
      return;
    } catch (error) {
      console.error("Fel vid uppdatering av recension", error);
    }
  });
}



function hasReviewd(form, existingMovie) {
  const header = document.getElementById("formHeader");
  header.textContent = "Du har redan lämnat ett omdöme"
  
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btnReviewdForm")
  const btnUpdateReview = document.createElement("button");
  btnUpdateReview.textContent = "Ändra ditt omdöme";
  const btnDeleteReview = document.createElement("button");
  btnDeleteReview.textContent = "Ta bort ditt omdöme";

  btnContainer.appendChild(btnUpdateReview);
  btnContainer.appendChild(btnDeleteReview);
  form.appendChild(btnContainer);;

  // Hantera uppdatering av recension
  btnUpdateReview.addEventListener("click", function() {
    renewForm(form, existingMovie);
    submitForm(form, existingMovie);

  });

  // Hantera borttagning av recension
  btnDeleteReview.addEventListener("click", async function(event) {
    event.preventDefault();
      let existingMovieId = existingMovie.imdb_id;
      console.log("DELET förfrågan", existingMovieId);
      confirmation(existingMovieId);
    
  });
}
    
function displayRateOnlyForm(form, existingMovie) {
  const header = document.getElementById("formHeader");
  header.textContent = "Du har redan lämnat ett betyg";
  form.innerHTML = "<p>Vill du komplettera med ett omdöme?</p>";

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btnReviewdForm");
  const btnUpdateReview = document.createElement("button");
  btnUpdateReview.textContent = "Lägg till omdöme";
  const btnDeleteReview = document.createElement("button");
  btnDeleteReview.textContent = "Ta bort ditt betyg";

  btnContainer.appendChild(btnUpdateReview);
  btnContainer.appendChild(btnDeleteReview);
  form.appendChild(btnContainer);

  // Hantera uppdatering av recension
  btnUpdateReview.addEventListener("click", function() {
    renewForm(form, existingMovie);
    submitForm(form, existingMovie);
  });

   // Hantera borttagning av betyg
   btnDeleteReview.addEventListener("click", async function(event) {
     event.preventDefault();
    confirmation(existingMovie.imdb_id);
  });
}

function handleNewReviewForm(form, movie) {
  console.log("inne i new review");
  form.innerHTML = `
    <div class="containerBtnRating flex-container" id="setCmdbScore">
        <button class="btnRating" data-rating="-1">-1</button>
        <button class="btnRating" data-rating="1">1</button>
        <button class="btnRating" data-rating="2">2</button>
        <button class="btnRating" data-rating="3">3</button>
        <button class="btnRating" data-rating="4">4</button>
        <button class="btnRating" data-rating="5">5</button>
    </div>
    <label for="Titel">Titel</label>
    <input type="text" id="titleTxt" name="nameTxt" placeholder="Titel på din recension...">
    <br/>
    <label for="recensionText">Information</label>
    <input type="text" id="recensionText" name="recensionText" placeholder="Berätta för oss vad du tyckte om filmen!">
    <br/>
    <input type="submit" value="Skicka recension">
  `;
  
  let selectedRating = null;
  document.querySelectorAll(".btnRating").forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelectorAll(".btnRating").forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectedRating = button.getAttribute("data-rating");
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("titleTxt").value;
    const reviewText = document.getElementById("recensionText").value;

    if (!name || !reviewText || !selectedRating) {
      alertUser("Vänligen fyll i alla fält och välj ett betyg.");
      return;
    }

    const newReview = {
      imdb_id: movie.imdb_id,
      cmdb_score: parseInt(selectedRating, 10),
      title: name,
      content: reviewText,
    };

    try {
      await reviewMedia(newReview);
      inputForm(movie);
    } catch (error) {
      console.error("Fel vid sändning av recension", error);
    }
  });
}






  
  
  

