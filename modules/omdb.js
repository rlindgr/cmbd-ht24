import { configOmdb } from "./config.js";
const baseUrl = configOmdb.omdbApi.baseUrl;

export async function getMediaOnTitel(titel){
    try{
        let endpoint =  `${baseUrl}&s=${titel}`;
        const response = await fetch(endpoint, {
            method: "GET",
           
        });
        if(!response.ok){
            console.log("felaktigt anrop");
        }
        const movie = await response.json();
        return movie;

    }catch(error) {
        console.error("kunde inte hämta filmer", error);
    }
}

export async function getMediaOnIdOmdb(id) {
    try {
        
        let endpoint = `${baseUrl}&i=${id}`;
        const response = await fetch(endpoint, {
            method: "GET",
        });

        if (!response.ok) {
            console.error("Felaktigt anrop till OMDB API");
            return null; 
        }
        const movie = await response.json();

        if (movie.Response === "False") {
            console.error("Filmen hittades inte på OMDB");
            return null;
        }
        return movie;

    } catch (error) {
        console.error("Kunde inte hämta filmer från OMDB", error);
        return null;
    }
}


