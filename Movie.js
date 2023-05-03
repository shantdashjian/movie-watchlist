const goldenStarMinimumRating = 7;

export default class Movie {
	constructor(movie) {
		Object.assign(this, movie)
	}

	getHtml(addToWatchlist) {
		const plot = this.getPlot()
		const runtime = this.getRuntime();
		const goldenStar = this.getGoldenStar()
		const addOrRemoveButton = this.getAddOrRemoveButton(addToWatchlist)
		return `
						<div class="movie flex">
							<img class="poster" src="${this.Poster}" alt="${this.Title}">
							<div class="movie-text flex column">
								<div class="title-star-rating flex">
									<h3>${this.Title}</h3>
									${goldenStar}
									<p>${this.imdbRating}</p>
								</div>
								<div class="runtime-genre-add-remove flex">
									<p>${runtime}</p>
									<p>${this.Genre}</p>
									${addOrRemoveButton}
								</div>
								<div class="plot flex">
									<p class="plot-text">${plot}</p>
								</div>
							</div>
						</div>
					`
	}

	getAddOrRemoveButton(addToWatchlist) {
		return addToWatchlist ? `
			<div class="add-to-watchlist">
								<button
									class="add-to-watchlist-button"
									data-imdb-id="${this.imdbID}"
									onclick="addToWatchlist(event)">
										<i class="fa-solid fa-circle-plus plus-minus-icon"></i>
										Watchlist
								</button>
							</div>
		` : `
		<div class="remove-from-watchlist">
								<button
									class="remove-from-watchlist-button"
									data-imdb-id="${this.imdbID}"
									onclick="removeFromWatchlist(event)">
										<i class="fa-solid fa-circle-minus plus-minus-icon"></i>
										Remove
									</button>
							</div>
		`;
	}

	getGoldenStar() {
		return this.imdbRating >= goldenStarMinimumRating ? `
			<i class="fa-solid fa-star star-icon"></i>
		` : `<span class="star-icon"></span>`;
	}

	getRuntime() {
		return this.Runtime == 'N/A' ? 'No runtime' : this.Runtime;
	}

	getPlot() {
		return this.Plot == 'N/A' ? 'No plot is available for this movie.' : this.Plot;
	}
}
