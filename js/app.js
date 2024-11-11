
import { getMovies } from "../modules/mockData.js";
import{generateMovies} from "../modules/ui.js";
import{generateUserStatistcs} from "../modules/ui.js";
import {generateFilters} from "../modules/ui.js";
let movies = [];

document.addEventListener("DOMContentLoaded", async () => {
  movies = await getMovies();
  await generateMovies(movies);
  await generateUserStatistcs(movies);
  await generateFilters(movies);
});

 




