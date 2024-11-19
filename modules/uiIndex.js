import {createStars} from "./data.js"
import { configOmdb } from "./config.js";
import { sendRate } from "./cmdb.js";
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
        const starDiv = createStars(imdbScore, true);

        
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
        const starDiv = createStars(imdbScore, true);

        
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

export function openRatingModal(event) {
  const ratingModal = document.getElementById("ratingModal");
  ratingModal.style.display = "block";

  ratingModal.dataset.movieId = event.target.closest("article").id;

  const stars = document.querySelectorAll("#starRating .star");
  
  stars.forEach(star => {
    star.classList.remove("selected");
    star.classList.remove("selected-red");
    star.style.color = "lightgray";
  });

  const currentRating = parseInt(event.target.dataset.rating) || 0;
  console.log("currentRating", currentRating);
 
  starSelection();
  document.getElementById("closeModal").addEventListener("click", closeModal);
  document.getElementById("submitRating").addEventListener("click", sendRating);
}

export function starSelection() {
  const starsInModal = document.querySelectorAll("#starRating .star");
  const ratingModal = document.getElementById("ratingModal");

  starsInModal.forEach(star => {
    star.addEventListener("click", (event) => {
      const selectedRating = parseInt(event.target.getAttribute("data-rating"));

      // Store the selected rating in the modal's dataset
      ratingModal.dataset.selectedRating = selectedRating;
      console.log("Selected rating inside loop:", selectedRating);

      // Reset all stars
      starsInModal.forEach(s => {
        s.classList.remove("selected");
        s.classList.remove("selected-red");
        s.style.color = "lightgray";
      });

      // Highlight stars up to the selected one
      starsInModal.forEach(s => {
        const starRating = parseInt(s.getAttribute("data-rating"));
        if (starRating <= selectedRating) {
          s.classList.add("selected");
          s.style.color = "gold";
        }
      });

      // Handle special cases for ratings (e.g., "red star")
      if (selectedRating < 1) { 
        starsInModal[0].classList.add("selected-red");
        starsInModal[0].style.color = "red";
      }
    });
  });

}

function sendRating() {
  const ratingModal = document.getElementById("ratingModal");
  const score = ratingModal.dataset.selectedRating;
  const id = ratingModal.dataset.movieId;
  

  if (!score) {
    console.log("!Score")
    const alertBox = document.getElementById("alertBox"); 
                  alertBox.style.display = "block";
                  let txtVarning = document.createElement("p");
                  txtVarning.setAttribute("id", "varningsText");
                  txtVarning.textContent = "Du måste fylla i alla fälten";
                  alertBox.appendChild(txtVarning);
                  document.getElementById("btnCloseAlert").addEventListener("click", () => {
                    const alertBox = document.getElementById("alertBox");
                    alertBox.style.display = "none"; // Dölj varningsrutan
                });
   
    return;
  }

  console.log("sendRating", id, score);
  sendRate(id, score);
  alertBox.style.display = "none";
  const txtVarning = document.getElementById("varningsText");
  if (txtVarning) {
    txtVarning.remove(); // Ta bort varningstexten från DOM
  }

  // Uppdatera modalens innehåll
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeModalButton = document.createElement("span");
  closeModalButton.id = "closeModal";
  closeModalButton.classList.add("close");
  closeModalButton.innerHTML = "&times;";
  closeModalButton.addEventListener("click", closeModal)

  const thankYouMessage = document.createElement("h3");
  thankYouMessage.textContent = "Tack för ditt betyg!";

  const starContainer = document.createElement("div");
  starContainer.id = "thankYouStars";

  // Skapa stjärnorna för feedback
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.classList.add("star");
    star.textContent = "★"; // Fyllig stjärna

    if (i <= score) {
      star.style.color = "gold";
    } else {
      star.style.color = "lightgray";
    }
    starContainer.appendChild(star);
  }

  // Hantera röd stjärna för betyg -1
  if (score < 1) {
    starContainer.innerHTML = ""; // Rensa stjärnor
    const redStar = document.createElement("span");
    redStar.textContent = "★";
    redStar.style.color = "red";
    redStar.classList.add("star");
    starContainer.appendChild(redStar);
  }

  ratingModal.innerHTML = "";
  modalContent.appendChild(closeModalButton);
  modalContent.appendChild(thankYouMessage);
  modalContent.appendChild(starContainer);
  ratingModal.appendChild(modalContent);
}

export function closeAlert() {
  document.getElementById("btnCloseAlert").addEventListener("click", () => {
    const alertBox = document.getElementById("alertBox");
    alertBox.style.display = "none"; // Dölj varningsrutan
});
}

function closeModal() {
  const ratingModal = document.getElementById("ratingModal");
  const alertBox = document.getElementById("alertBox"); 
  ratingModal.style.display = "none";
  alertBox.style.display = "none";
  const txtVarning = document.getElementById("varningsText");
  if (txtVarning) {
    txtVarning.remove(); // Ta bort varningstexten från DOM
  }

  // Återställ innehållet
  ratingModal.innerHTML = `
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <h2>Betygsätt filmen</h2>
      <div id="starRating">
          <button class="star negative" data-rating="-1">&#9733;</button>
          <button class="star" data-rating="1">&#9733;</button>
          <button class="star" data-rating="2">&#9733;</button>
          <button class="star" data-rating="3">&#9733;</button>
          <button class="star" data-rating="4">&#9733;</button>
          <button class="star" data-rating="5">&#9733;</button>
      </div>
      <button id="submitRating">Skicka betyg</button>
    </div>
  `;

  // Återkoppla funktioner
  document.getElementById("closeModal").addEventListener("click", closeModal);
  document.getElementById("submitRating").addEventListener("click", sendRating);
  starSelection(); // Förnya stjärninteraktioner
}












  



