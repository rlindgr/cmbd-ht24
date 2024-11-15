
import { user } from "../modules/config.js";
import {generateMovies} from "../modules/uiIndex.js"
import { topRatedSeries } from "../modules/cmdb.js";
import { generateSeries } from "../modules/uiIndex.js";
import { createUser } from "../modules/ui.js";
import { topRated } from "../modules/cmdb.js";
import { generateTopList } from "../modules/uiIndex.js";


import {filterMoviesBySearchInput} from "../modules/ui.js"
import {topRatedMovies} from "../modules/cmdb.js"

 let userInfo = user.value;

 let topMovies = [];
 let topSeries = [];
 let top = [];
 
document.addEventListener("DOMContentLoaded", async () => {
  
  topMovies = await topRatedMovies();
  topSeries = await topRatedSeries();
  top = await topRated();
  console.log(topMovies);
  console.log(topSeries);
  console.log(top);
  generateMovies(topMovies);
  generateSeries(topSeries);
  generateTopList(top);
  
  
});