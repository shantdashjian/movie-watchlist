import Movie from "./Movie";

const apiKey = '5e86fe7d'
const baseUrl = 'https://www.omdbapi.com'
const movies = document.getElementById('movies')

function renderMovies(imdbIDs) {
	const addToWatchlist = window.location.href.includes('index.html')
	movies.innerHTML = ''
	imdbIDs.forEach(imdbID => {
		fetch(`${baseUrl}/?i=${imdbID}&plot=full&apikey=${apiKey}`)
			.then(res => res.json())
			.then(result => {
				const movie = new Movie(result)
				movies.innerHTML += movie.getHtml(addToWatchlist)
			})
	})
}

export { renderMovies, apiKey, baseUrl, movies }
