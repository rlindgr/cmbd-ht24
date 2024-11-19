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



export async function updateReview(imdbId, mediaDto) {
    try {
        const endpoint = baseUrl + `Contributions/${imdbId}`;  
        
        const response = await fetch(endpoint, {
            method: "PUT",
            headers: {
                'X-API-KEY': 'TcDz95HMTEmiww4FpLVELw',  // API-nyckeln
                'Content-Type': 'application/json',  // Se till att innehållet är JSON
            },
            body: JSON.stringify(mediaDto),  // Skicka data i body
        });

        // Kontrollera om svaret är OK (status 200-299)
        if (response.ok) {
            const responseData = await response.json();  // Parsar svaret som JSON
            console.log("Bidraget har uppdaterats:", responseData);  // Logga serverns svar
        } else {
            // Om svaret inte är OK, logga felet
            const errorText = await response.text();
            console.error("Fel vid uppdatering av bidrag:", errorText);
        }
    } catch (error) {
        // Hantera eventuella fel som uppstår vid begäran
        console.error("Kunde inte uppdatera bidrag:", error);
    }
}



export async function getUserContribution(){
    try {
        let endpoint= `${baseUrl}Contributions/my`;
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

export async function reviewMedia(mediaDto) {
    try {
        let endpoint = baseUrl+ "Contributions/Review";  
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                [config.cmdbApi.key]: config.cmdbApi.value,
                'Content-Type': 'application/json',  // Ensure content is JSON
            },
            body: JSON.stringify(mediaDto),  // Send the review data in the body
        });

        // Check if the response is OK (status 200-299)
        if (response.ok) {
            const responseData = await response.json();  // Parse the response as JSON
            console.log("Recension skickad :D :P", responseData);  // Log the server response
        } else {
            // If the response is not OK, log the error
            const errorText = await response.text();
            console.error("Fel vid sändning av recension:", errorText);
        }
    } catch (error) {
        // Log any error that occurs during the request
        console.error("Kunde inte posta:", error);
    }
}

export async function deleteReview(imdbId) {
    const url = baseUrl + `Contributions/${imdbId}`;
  
    try {
      const response = await fetch(url, {
        method: 'DELETE', // DELETE begäran för att ta bort recension
        headers: {
        [config.cmdbApi.key]: config.cmdbApi.value,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Fel vid borttagning av recension');
      }
  
      const result = await response.json();
      console.log('Recensionen har tagits bort!', result);
    } catch (error) {
      console.error('Fel vid borttagning av recension:', error);
    }
}
  


  export async function sendRate(imdbId, rating) {
    let url = baseUrl + `Contributions/Rate/${imdbId}/${rating}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                [config.cmdbApi.key]: config.cmdbApi.value,
                'Content-Type': 'application/json', 
            }
        });

        if (response.ok) {
            const data = await response.json();  // Parse the response as JSON
            console.log('Rating submitted successfully:', data);
        } else {
            const errorData = await response.json();
            console.error('Error submitting rating:', errorData);
        }
    } catch (error) {
        // Handle any errors during the fetch request
        console.error('Error sending rating:', error);
    }
}








