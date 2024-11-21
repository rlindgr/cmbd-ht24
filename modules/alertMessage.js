import { deleteReview } from "./cmdb.js";
export function alertUser(message) {
    const alertBox = document.getElementById("alertBox"); 
                  alertBox.style.display = "block";
                  let txtVarning = document.createElement("p");
                  txtVarning.setAttribute("id", "varningsText");
                  txtVarning.textContent = message;
                  alertBox.appendChild(txtVarning);
                  document.getElementById("btnCloseAlert").addEventListener("click", closeAlert);
}

function closeAlert() {
    const alertBox = document.getElementById("alertBox");
    alertBox.style.display = "none"; 
}

let isConfirmationInitialized = false;

export function confirmation(currentMovieId) {
    console.log("inne i funktionen", currentMovieId);
    
    // Hämta element för bekräftelseboxen och knapparna
    const confirmationBox = document.getElementById("customConfirm");
    const confirmYes = document.getElementById("confirmYes");
    const confirmNo = document.getElementById("confirmNo");

    // Kontrollera om bekräftelse-dialogen redan har initierats
    if (!isConfirmationInitialized) {
        // Hantera "Ja"-knappen
        confirmYes.addEventListener("click", async () => {
            confirmationBox.style.display = "none";  // Dölja bekräftelseboxen

            // Anropa API för att ta bort recensionen
            try {
                console.log("try iniciated")
                await deleteReview(currentMovieId);  // Gör API-anropet här
                console.log("Recensionen har tagits bort!");
            } catch (error) {
                console.error("Fel vid borttagning av recension", error);
            }
        });

        // Hantera "Nej"-knappen
        confirmNo.addEventListener("click", () => {
            confirmationBox.style.display = "none";  // Dölja bekräftelseboxen
        });

        // Markera att bekräftelse-dialogen har initialiserats
        isConfirmationInitialized = true;
    }

    // Visa bekräftelseboxen (utan att påverka URL)
    confirmationBox.style.display = "block";
   
}

