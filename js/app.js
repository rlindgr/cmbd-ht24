
console.log("Loading app.js");
import { getMovies } from "../modules/mockData.js";
import{generateMovies} from "../modules/ui.js";
import{createStars} from "../modules/data.js";
let movies = [];

document.addEventListener("DOMContentLoaded", async () => {
  movies = await getMovies();
  console.log(movies);
  generateMovies(movies);
  for(const movie of movies){
    let movieScore = movie.cmdb_score;
    createStars(movieScore);
  }
  
});






