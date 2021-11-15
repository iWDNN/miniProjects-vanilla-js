const FAV_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?&sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&query='

const main = document.querySelector('main')
const form = document.getElementById('form')
const search = document.querySelector('.search')

getMovies(FAV_URL)

async function getMovies(url) {
  const resp = await fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('400 or 500 error')
      }
      return res.json()
    })
    .then(result => result)
    .catch(() => {
      console.log('error')
    })
  showMovies(resp.results)
}
function showMovies(movies) {
  main.innerHTML = ''
  movies.forEach(movie => {
    const { poster_path, title, vote_average, overview } = movie
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path} " alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassbyRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h4>Overview</h4>
        ${overview}
      </div>
    `
    main.appendChild(movieEl)
  })
}
function getClassbyRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}
form.addEventListener('submit', e => {
  e.preventDefault()

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCH_URL + searchTerm)
    search.value = ''
  }
})
