import Movie from './Movie'

const apiKey = '5e86fe7d'
const baseUrl = 'http://www.omdbapi.com'

showWatchlist()

window.removeFromWatchlist = function (event) {
	const imdbID = event.target.dataset.imdbId
	localStorage.removeItem(imdbID)
	showWatchlist()
}

function showWatchlist() {
	const movies = document.getElementById('movies')
	const imdbIDs = loadWatchlistData();
	if (imdbIDs.length > 0) {
		movies.innerHTML = ''
		imdbIDs.forEach(imdbID => {
			fetch(`${baseUrl}/?i=${imdbID}&plot=full&apikey=${apiKey}`)
				.then(res => res.json())
				.then(result => {
					const movie = new Movie(result)
					movies.innerHTML += movie.getHTML(false)
				})
		})
	} else {
		movies.innerHTML = `
				<div class="no-movies">
						<p>Your watchlist is looking a little empty...</p>
						<div class="go-to-search">
							<i class="fa-solid fa-circle-plus" style="color: #111827;"></i>
							<a
								class="go-to-search-link"
								href="index.html">Let’s add some movies!</a>
						</div>
					</div>
				`
	}
}

function loadWatchlistData() {
	return Object.keys(localStorage)
}
