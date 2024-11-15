import { config } from "./config.js";

const baseUrl = config.cmdbApi.baseUrl;

export async function getGenres(){
    let endpoint = baseUrl + "Genres";
    try{
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                [config.cmdbApi.key]: config.cmdbApi.value 
            },
        });
        if(!response.ok){
            console.log("felaktigt anrop");
        }
        const genres = await response.json();
        return genres;
    } catch(error){
        console.error("Kunde inte hämta, något gick fel", error);
    }   
}

export async function reviewMedia(mediaDto){
    try {
        let endpoint = baseUrl + "Contributions/Review";
        const response = await fetch(endpoint, {
           method: "POST",
           headers: {
            [config.cmdbApi.key]: config.cmdbApi.value,
           },
           body: JSON.stringify(mediaDto),
        });
        console.log("response", response.status);
        if (!response.ok) {
            console.log("felaktigt anrop");
        }
        
    }
    catch(error){
        console.error("kunde inte posta", error);
    }
}

export async function getUserContribution(userId){
    try {
        let endpoint= `${baseUrl}Contributions/${userId}`;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                [config.cmdbApi.key]: config.cmdbApi.value,
            }
        });
        if(!response.ok) {
            console.log("felaktigt anrop");
        }
        const contributions = await response.json();
        console.log(contributions);
        return contributions;
    } catch(error) {
        console.error("kunde inte hämta contributions", error);
    }
}

export async function getProfile(){
    try{
        let endpoint = `${baseUrl}Users/profile`;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                [config.cmdbApi.key]: config.cmdbApi.value,
            },
        });
    } catch(error) {
        console.error("kunde inte hämta profil", error);
    }
}

export async function topRatedMovies(){
    try{
        let endpoint = `${baseUrl}Toplists/top-rated-movies`;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                [config.cmdbApi.key]: config.cmdbApi.value,
            }
        });
        if(!response.ok){
            console.log("felaktigt anrop");
        }
        const top = await response.json();
        
        return top;

    }catch(error) {
        console.error("kunde inte hämta filmer", error);
    }
}
export async function topRatedSeries(){
    try{
        let endpoint = `${baseUrl}Toplists/top-rated-series`;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                [config.cmdbApi.key]: config.cmdbApi.value,
            }
        });
        if(!response.ok){
            console.log("felaktigt anrop");
        }
        const top = await response.json();
        return top;

    }catch(error) {
        console.error("kunde inte hämta filmer", error);
    }
}

export async function topRated(){
    try{
        let endpoint = `${baseUrl}Toplists/top-rated`;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                [config.cmdbApi.key]: config.cmdbApi.value,
            }
        });
        if(!response.ok){
            console.log("felaktigt anrop");
        }
        const top = await response.json();
        return top;

    }catch(error) {
        console.error("kunde inte hämta filmer", error);
    }
}

export async function getMovieOnId(cmdbId){
    try{
        let endpoint =  `${baseUrl}Media/${cmdbId}`;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                [config.cmdbApi.key]: config.cmdbApi.value,
            }
        });
        if (response.status === 404) {
            console.log("Filmen finns inte i CMD, returnerar null.");
            return null; 
        }

        if(!response.ok){
            console.log("felaktigt anrop");
            return null;
        }
        const movie = await response.json();
        return movie;

    }catch(error) {
        console.error("kunde inte hämta filmer", error);
    }
}

export function sendReviewToServer(review) {
    fetch("/submit-review", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Recension skickad!", data);
        // Hantera svaret från servern
    })
    .catch(error => {
        console.error("Fel vid skickande av recension:", error);
    });
}




