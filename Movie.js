export default class Movie {
	constructor(movie) {
		Object.assign(this, movie)
	}

	getHTML = function(add) {
		const addOrRemove = add ? `
			<div class="add-to-watchlist">
								<i class="fa-solid fa-circle-plus" style="color: #111827;"></i>
								<button
									class="add-to-watchlist-button"
									data-imdb-id="${this.imdbID}"
									onclick="addToWatchlist(event)">Watchlist</button>
							</div>
		` : `
		<div class="remove-from-watchlist">
								<i class="fa-solid fa-circle-minus" style="color: #111827;"></i>
								<button
									class="from-from-watchlist-button"
									data-imdb-id="${this.imdbID}"
									onclick="removeFromWatchlist(event)">Remove</button>
							</div>
		`
		return `
						<div class="movie">
							<img src="${this.Poster}" alt="${this.Title}">
							<h3>${this.Title}</h3>
							<p>${this.imdbRating}</p>
							<p>${this.Runtime}</p>
							<p>${this.Genre}</p>
							${addOrRemove}
							<p>${this.Plot}</p>
						</div>
					`
	}
}
