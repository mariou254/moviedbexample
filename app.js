//constantes para adquiriri la informacion de la api
const API_KEY = 'api_key=2d4cb4615be1b6d3c9183d0b22f9002f';
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
//constante para tener las imagenes 
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
//contante para el buscador
const searchURL = BASE_URL + '/search/movie?'+API_KEY
const genres=[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]

const main = document.getElementById('main')
const form=document.getElementById('form')
const search = document.getElementById('search')
const tagsEl=document.getElementById('tags')
//const button=document.getElementById('go')
let selectGenre=[]
setGenere()
function setGenere(){
    tagsEl.innerHTML=''
    console.log(genres)
    
    genres.forEach(genre=>{
        const t=document.createElement('div')
        t.classList.add('tag')
        t.id=genre.id
        t.innerText = genre.name
        t.addEventListener('click', () => {
            if (selectGenre.length == 0) {
                selectGenre.push(genre.id)
            } else {
                if (selectGenre.includes(genre.id)) {
                    selectGenre.forEach((id, idx)=> {
                        if (id == genre.id){
                            selectGenre.splice(idx,1)
                        }
                    })
                } else {
                    selectGenre.push(genre.id)
                }
            }
            console.log(selectGenre)
            getMovies(API_URL + '&with_genres=' + encodeURI(selectGenre.join(',')));
            selected()
        })
        tagsEl.appendChild(t)
        
    })
}
function selected() {
    if (selectGenre != 0) {
        selectGenre.forEach(id => {
            const selectTag = document.getElementById(id)
            selectTag.classList.add('highlight')
    })
    }
    
}
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