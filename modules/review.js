class NewReviewDto {
    constructor(imdb_id, cmdb_score, title, content) {
        this.imdb_id = imdb_id;
        this.cmdb_score = cmdb_score;
        this.title = title;
        this.content = content;
    }
}

export default NewReviewDto;

let selectedRating = null;  // Variabel för att hålla reda på det valda betyget

// Eventlistener för när användaren skickar in formuläret
export function inputForm() {
    const form = document.getElementById("reviewForm");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Hindra formuläret från att skickas på vanligt sätt

        // Hämta värdena från formuläret
        const name = document.getElementById("titleTxt").value;
        const reviewText = document.getElementById("recensionText").value;

        // Kontrollera att alla fält är ifyllda och att ett betyg är valt
        if (!name || !date || !reviewText || selectedRating === null) {
            alert("Vänligen fyll i alla fält och välj ett betyg.");
            return;
        }

        // Här kan vi skapa vårt objekt NewReviewDto
        const newReview = new NewReviewDto(
            "some-imdb-id",  // Detta bör vara ett unikt IMDB ID för filmen
            selectedRating,  // Det valda betyget
            reviewText,      // Recensionstexten från användaren
            reviewText       // Använd samma text för titel här, kan förbättras beroende på behov
        );

        console.log(newReview);  // Här kan du logga objektet för att se att det är korrekt

        // Här kan du lägga till logik för att skicka recensionen till servern, exempelvis:
        // sendReviewToServer(newReview);
        
        // Återställ formuläret
        form.reset();
        selectedRating = null;
        document.querySelectorAll(".btnRating").forEach(btn => btn.classList.remove("selected"));
    });
}

export function ratingButton() {
    document.querySelectorAll(".btnRating").forEach(button => {
        button.addEventListener("click", function () {
            // Hämta betyget från knappen och sätt det som valt betyg
            selectedRating = parseInt(this.textContent.trim());  // Läser av betyget (1-5 eller -1)

            // Logga betyget för att se att det fungerar
            console.log("Valt betyg:", selectedRating);

            // Markera den valda knappen
            document.querySelectorAll(".btnRating").forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
}

