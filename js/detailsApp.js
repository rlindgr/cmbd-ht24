import { getMovieOnId } from "../modules/cmdb.js";
import { generateMovie, inputForm, ratingButton } from "../modules/uiDetails.js";
import { generateActors } from "../modules/uiDetails.js";
import { getReviews } from "../modules/uiDetails.js";
import { searchFunction } from "../modules/searchfunction.js";
import { user } from "../modules/config.js";
import { getUserContribution } from "../modules/cmdb.js";
let movie = {};
let userInfo = user.value;
let userId = userInfo.id;

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cmdbId = urlParams.get("id");
    console.log(cmdbId)

    if(cmdbId){
        try{
            const movie = await getMovieOnId(cmdbId);
            generateMovie(movie);
            generateActors(movie);
            getReviews(movie);
            let contributedMovies = await getUserContribution();
            inputForm(movie, contributedMovies.value);
            ratingButton();


        }catch(error) {
            console.error("Fel vid hämtning av filmdata", error);
        }
    } else {
        console.error("Ingen film hittades u URL:en");
    }
    
    searchFunction();
   
   
   
   
});

  