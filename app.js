//constantes para adquiriri la informacion de la api
const API_KEY = 'api_key=2d4cb4615be1b6d3c9183d0b22f9002f';
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
//constante para tener las imagenes 
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
//contante para el buscador
const searchURL = BASE_URL + '/search/movie?'+API_KEY

const main = document.getElementById('main')
const form=document.getElementById('form')
const search = document.getElementById('search')
//const button=document.getElementById('go')
getMovies(API_URL)

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results)
    })
}
//funcion para mostrar las peliculas 
function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie')
        movieEl.innerHTML =`
            <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h1>${title}</h1>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                ${overview}

            </div>`
        main.appendChild(movieEl);
    });
    
}
function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    }
    else if (vote >= 5) {
        return 'yellow'
    }
    else if(vote>=3){
        return 'red'
    }
}
/* form.addEventListener('onclick',) */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value
    if (searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }
    else {
        getMovies(API_URL)
    }
})