import { generateUserStatistcs } from "./ui.js";
import {generateMovies} from "./ui.js"

//https://www.youtube.com/watch?v=i2eg2xDbjM0 
//https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating
//https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
function allGenres(movies) {
    let currentGenres = [];
    for(const movie of movies) {
        let genres = [];
        genres = movie.genres;
        let temp = [];
       temp = genres.map(genre => genre);
       currentGenres.push(...temp);
    }
    return currentGenres;
}

function uniqueGenres (allGenresData) {
    allGenresData = allGenresData.filter((value, index, self) => index === self.findIndex((t) => (t.id === value.id && t.name === value.name)))
    return allGenresData;
}

//https://stackoverflow.com/questions/66455933/javascript-filter-and-some-on-array-of-objects
function filterOnGenre(movies, genreId) {
    const filteredMovies = movies.filter((movie) =>
    movie.genres.some(genre => genre.id === genreId)
    );
    return filteredMovies;
}

function createDiv (actualGenres, movies){
    const allGenreDivs = [];
    actualGenres.forEach(genre => {
        const div = document.createElement("div");
        div.classList.add("progressBar");
        const proportion = document.createElement("div");
        proportion.classList.add("progress");
        proportion.setAttribute("id", genre.id);
        const text = document.createElement("p");
        text.textContent = genre.name;
        div.appendChild(proportion);
        div.appendChild(text);
        allGenreDivs.push(div);

        div.addEventListener("click", function filterByGenre() {
            let genreId = genre.id;
           const filter = filterOnGenre(movies, genreId);
           const filteredMovies = generateMovies(filter);
           const stats = generateUserStatistcs(filter);
           let headline = document.getElementById("ratedItems");
            headline.textContent = genre.name;
        })
        
    });
    return allGenreDivs;
}

//https://www.geeksforgeeks.org/how-to-count-number-of-occurrences-of-repeated-names-in-an-array-of-objects-in-javascript/
function genrePrecentadge (currentGenres, key) {

    let arr2 = [];
    currentGenres.forEach((x) => {
        if(arr2.some((val) => {return val[key] == x[key] })) {
            arr2.forEach((k) => { 
                if(k[key] === x[key]) {
                    k["occurrence"]++;
                }
            })
        }
        else {
            let a = {};
            a[key] = x[key];
            a["occurrence"] = 1;
            arr2.push(a);
        }
    })
    
    return arr2;
}



export function displayGeneres(movies){
    const allGenresData = allGenres(movies);
    const progressData = genrePrecentadge(allGenresData, "id");
    let actualGenres = uniqueGenres(allGenresData);
    let visualProgressBars = createDiv(actualGenres, movies);
    return visualProgressBars;
}

export function genresPercent (movies) {
    let sum = movies.length;
    const allGenresData = allGenres(movies);
    const progressData = genrePrecentadge(allGenresData, "id");
    let percent = [];
    progressData.forEach(data => {
        let id = data.id;
        let count = data.occurrence;
       let value = count/sum;
       let valuePercent = value * 100;
       let progress = document.getElementById(id);
       progress.style.width = `${valuePercent}%`;
    })
}