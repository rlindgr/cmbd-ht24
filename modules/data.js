import {generateMovies} from "./ui.js"
import { openRatingModal } from "./uiIndex.js";
 

export function averageSum(movies) {
  let sum = 0;
  let validCount = 0;  // För att hålla reda på hur många giltiga poäng vi har

  for (const movie of movies) {
      // Kontrollera om cmdb_score är ett giltigt tal
      const score = movie.contribution?.cmdb_score;

      if (typeof score === 'number' && !isNaN(score)) {  // Säkerställ att det är ett giltigt nummer
          sum += score;
          validCount++;  // Öka räknaren för giltiga poäng
      }
  }

  // Om vi har giltiga filmer att räkna med, beräkna medelvärdet
  if (validCount > 0) {
      const averageScore = sum / validCount;
      console.log(averageScore);  // Logga det beräknade medelvärdet
      return averageScore;
  } else {
      console.log("Inga giltiga poäng att beräkna.");
      return 0;  // Om inga giltiga poäng fanns, returnera 0
  }
}


export function createStars(cmdbScore, isClickable = false) {
  const starsDiv = document.createElement("div");
  starsDiv.classList.add("ratings");
  

  if (cmdbScore === -1) {
      const redStar = document.createElement("span");
      redStar.innerHTML = "&#9733;";
      redStar.classList.add("redFilled");
      starsDiv.appendChild(redStar);
  } else {
      for (let i = 0; i < cmdbScore; i++) {
        const star = document.createElement("span");
        star.innerHTML = "&#9733;"; // Fylld stjärna
        star.classList.add("filled");
        starsDiv.appendChild(star);
      }
  }

  // Om isClickable är true, gör hela starsDiv klickbar och lägg till eventlistener
  if (isClickable) {
      starsDiv.classList.add("clickable");
      starsDiv.addEventListener("click", openRatingModal); // Använd modal-funktion
  }

  return starsDiv;
}



function closeModal() {
  // Hitta modalen
  const ratingModal = document.getElementById("ratingModal");
  
  // Sätt modalens display till "none" för att dölja den
  ratingModal.style.display = "none";
  
  // Rensa stjärnmarkeringarna i modalen (om du vill att betygsvalen ska återställas varje gång)
  const stars = document.querySelectorAll("#starRating .star");
  stars.forEach(star => star.classList.remove("selected"));
}


export function imageLink(movies) {
    let averageScore = averageSum(movies);
    console.log("medel Score imageLink", averageScore);
    let imageLink;

  if (averageScore < 0) {
    imageLink = "https://studenter.miun.se/~jonlun2300/uppgift2/poppe0.png";
  }
  if (averageScore >= 0 && averageScore < 1) {
    imageLink = "https://studenter.miun.se/~jonlun2300/uppgift2/poppe1.png";
  }
  if (averageScore >= 1 && averageScore < 2) {
    imageLink = "https://studenter.miun.se/~jonlun2300/uppgift2/poppe2.png";
  }
  if (averageScore >= 2 && averageScore < 3) {
    imageLink = "https://studenter.miun.se/~jonlun2300/uppgift2/poppe3.png";
  }
  if (averageScore >= 3 && averageScore < 4) {
    imageLink = "https://studenter.miun.se/~jonlun2300/uppgift2/poppe4.png";
  }
  if (averageScore >= 4) {
    imageLink = "https://studenter.miun.se/~jonlun2300/uppgift2/poppe5.png";
  }
  return imageLink;
}

export function generatePoppe(movies){
   const score = document.createElement("div");
    score.classList.add("flex-item", "userDataPicture");
    score.setAttribute("id", "userScore")
    const image = document.createElement("img");
    image.src = imageLink(movies);
    const number = document.createElement("p");
    let txt = averageSum(movies);
    number.textContent = txt;
    score.appendChild(image);
    score.appendChild(number);
    return score;
 
}

export function generatestatsitcs(movies) {
    let movieStats = 0;
    let seriesStats = 0;
    for(const movie of movies) {
        if(movie.media_type == "Movie") {
            movieStats++;
        }
        else {
            seriesStats++;
        }

    }
    return {movieStats , seriesStats};


}
function filterOnMediaType(movies, mediaType) {
  const filteredMovies = movies.filter((movie) => movie.media_type === mediaType);
  return filteredMovies;
}

export function generateMovieStatistics(movies) {
    const container = document.createElement("div");
    container.classList.add("flex-item", "userDataPicture");
    const image = document.createElement("img");
    image.src = "https://studenter.miun.se/~jonlun2300/uppgift2/camera.png";
    const number = document.createElement("p");
    let txt = generatestatsitcs(movies).movieStats;
    number.textContent = txt;
    container.appendChild(image);
    container.appendChild(number);
    container.addEventListener("click", function () {
      let mediaType = "Movie";
      let filterMovies = filterOnMediaType(movies, mediaType);
      const filteredMovies = generateMovies(filterMovies);
      
    })
    

    return container;

}

export function generateSeriesStatistics(movies) {
    const container = document.createElement("div");
    container.classList.add("flex-item", "userDataPicture")
    container.setAttribute("id", "userTv")
    const image = document.createElement("img");
    image.src = "https://studenter.miun.se/~jonlun2300/uppgift2/tv.png";
    const number = document.createElement("p");
    let txt = generatestatsitcs(movies).seriesStats;
    number.textContent = txt;
    container.appendChild(image);
    container.appendChild(number);

    container.addEventListener("click", function () {
      let mediaType = "TVSeries";
      let filterMovies = filterOnMediaType(movies, mediaType);
      const filteredMovies = generateMovies(filterMovies);
      
    })

    return container;

}








