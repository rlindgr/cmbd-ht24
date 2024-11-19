
import {generateMovies} from "../modules/uiIndex.js"
import { topRatedSeries } from "../modules/cmdb.js";
import { generateSeries } from "../modules/uiIndex.js";
import { searchFunction } from "../modules/searchfunction.js";
import { starSelection } from "../modules/uiIndex.js";
import { topRated } from "../modules/cmdb.js";
import { generateTopList } from "../modules/uiIndex.js";
import { closeAlert} from "../modules/uiIndex.js";

import {topRatedMovies} from "../modules/cmdb.js"

 

 let topMovies = [];
 let topSeries = [];
 let top = [];
 
document.addEventListener("DOMContentLoaded", async () => {
  
  topMovies = await topRatedMovies();
  topSeries = await topRatedSeries();
  top = await topRated();
  generateMovies(topMovies);
  generateSeries(topSeries);
  generateTopList(top);
  starSelection();
  searchFunction();
  closeAlert();
  
  
});