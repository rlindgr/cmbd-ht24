
import { user } from "../modules/config.js";
import { generateUserContributions } from "../modules/ui.js";
import{createUser, generateMovies} from "../modules/ui.js";
import{generateUserStatistcs} from "../modules/ui.js";
import {generateFilters} from "../modules/ui.js";
import {filterMoviesBySearchInput} from "../modules/ui.js"
import {topRatedMovies} from "../modules/cmdb.js"

 let userInfo = user.value;
 let movies = [];
 let topRated = [];

document.addEventListener("DOMContentLoaded", async () => {
  
 
  createUser(userInfo);
  let userId = userInfo.id 
  movies = await generateUserContributions(userId);
  console.log("filmer", movies);
  generateMovies(movies);
  generateUserStatistcs(movies);
  generateFilters(movies);
  filterMoviesBySearchInput(movies);
  
});


 




