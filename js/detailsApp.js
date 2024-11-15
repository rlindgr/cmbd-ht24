import { getMovieOnId } from "../modules/cmdb.js";
import { generateMovie, inputForm, ratingButton } from "../modules/uiDetails.js";
import { generateActors } from "../modules/uiDetails.js";
import { getReviews } from "../modules/uiDetails.js";
import { sendReviewToServer } from "../modules/cmdb.js";
let movie = {};
let userId = 73;

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


        }catch(error) {
            console.error("Fel vid hämtning av filmdata", error);
        }
    } else {
        console.error("Ingen film hittades u URL:en");
    }
    
   
   
   
   
});

  