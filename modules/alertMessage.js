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

export function confirmation(currentMovieId) {
    const confirmationBox = document.getElementById("customConfirm");
    const confirmYes = document.getElementById("confirmYes");
    const confirmNo = document.getElementById("confirmNo");

    confirmYes.addEventListener("click", async () => {
    confirmationBox.classList.add("hidden");
    try {
        await deleteReview(currentMovieId);
        console.log("Recensionen har tagits bort!");
    } catch (error) {
        console.error("Fel vid borttagning av recension", error);
    }
    });

    confirmNo.addEventListener("click", () => {
    confirmationBox.classList.add("hidden");
    });


}