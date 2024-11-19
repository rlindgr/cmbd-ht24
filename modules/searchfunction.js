import { configOmdb } from "./config.js";
const baseUrl = configOmdb.omdbApi.baseUrl;

export function searchFunction() {
    // Hantera input och visa förslag
    const searchInput = document.getElementById("searchInput"); // Refererar till det specifika sökfältet
    const suggestionsBox = document.getElementById("searchSuggestions"); // Refererar till förslagsrutan
    
    searchInput.addEventListener("input", async function (e) {
        const query = e.target.value.trim(); // Hämta och trimma sökfrågan
    
        if (query.length >= 3) { // Börja söka om minst 3 tecken skrivs
            try {
                const response = await fetch(`${baseUrl}s=${encodeURIComponent(query)}`); // Hantera specialtecken i sökfrågan
                if (response.ok) {
                    const data = await response.json();
                    if (data.Response === "True") {
                        displaySuggestions(data.Search, suggestionsBox); // Visa sökförslag
                    } else {
                        suggestionsBox.innerHTML = "<div>Inga resultat hittades</div>";
                        suggestionsBox.style.display = "block";
                    }
                } else {
                    console.error("API-svar misslyckades:", response.status);
                }
            } catch (error) {
                console.error("Ett nätverksfel inträffade:", error);
            }
        } else {
            suggestionsBox.style.display = "none"; // Göm förslagsrutan om färre än 3 tecken skrivs
        }
    });
  
    const searchForm = document.getElementById("searchForm"); // Referera direkt till formuläret
  
  
  searchForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Förhindra standardbeteende (att sidan laddas om)
      
      const query = searchInput.value.trim(); // Hämta och trimma sökfrågan
      if (query) {
          // Omdirigera till search.html med query som parameter
          window.location.href = `Search.html?query=${encodeURIComponent(query)}`;
      }
  });
  }
  
  function displaySuggestions(results, suggestionsBox) {
    suggestionsBox.innerHTML = ""; // Rensa gamla resultat
  
    // Begränsa till de första 3 filmerna
    const limitedResults = results.slice(0, 3);
  
    limitedResults.forEach(movie => {
        const div = document.createElement("div");
        div.innerText = movie.Title;
        div.addEventListener("click", () => {
            // Omdirigera till en ny sida för vald film
            window.location.href = `Details.html?id=${movie.imdbID}`;
        });
        suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = "block";
  }