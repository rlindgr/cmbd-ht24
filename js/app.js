
import { user } from "../modules/config.js";
import { generateUserContributions } from "../modules/ui.js";
import{createUser, generateMovies} from "../modules/ui.js";
import{generateUserStatistcs} from "../modules/ui.js";
import {generateFilters} from "../modules/ui.js";
import { searchFunction } from "../modules/searchfunction.js";


 let userInfo = user.value;
 let movies = [];

document.addEventListener("DOMContentLoaded", async () => {
  
 
  createUser(userInfo);
  let userId = userInfo.id
  console.log(userId); 
  movies = await generateUserContributions();
  console.log("filmer", movies);
  generateMovies(movies);
  generateUserStatistcs(movies);
  generateFilters(movies);
  searchFunction();
  
});


 




