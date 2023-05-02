import { renderMovies, movies } from './utils'

showWatchlist()

function showWatchlist() {
	const imdbIDs = loadWatchlistData();
	if (imdbIDs.length > 0) {
		renderMovies(imdbIDs);
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
	return Object.keys(localStorage).filter(key => key.startsWith('tt'))
}

window.removeFromWatchlist = function (event) {
	const imdbID = event.target.dataset.imdbId
	localStorage.removeItem(imdbID)
	showWatchlist()
}

