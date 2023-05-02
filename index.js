const apiKey = '5e86fe7d'
const searchButton = document.getElementById('search-button')
const searchInput = document.getElementById('search-input');
const movies = document.getElementById('movies')

searchButton.addEventListener('click', getSearchResults)

async function getSearchResults() {
	const baseUrl = 'http://www.omdbapi.com'
	const title = searchInput.value
	const response = await fetch(`${baseUrl}/?s=${title}&apikey=${apiKey}`)
	const data = await response.json()
	if (data.Response == 'True') {
		const titles = data.Search.map(movie => movie.Title)
		movies.innerHTML = ''
		titles.forEach(title => {
			fetch(`${baseUrl}/?t=${title}&plot=full&apikey=${apiKey}`)
				.then(res => res.json())
				.then(result => {
					movies.innerHTML += `
					<div class="movie">
						<img src="${result.Poster}" alt="${result.Title}">
						<h3>${result.Title}</h3>
						<p>${result.imdbRating}</p>
						<p>${result.Runtime}</p>
						<p>${result.Genre}</p>
						<div class="add-to-watchlist">
							<i class="fa-solid fa-circle-plus" style="color: #111827;"></i>
							<button id="add-to-watchlist-button">Watchlist</button>
						</div>
						<p>${result.Plot}</p>
					</div>
			`
				})
		})
	} else {
		movies.innerHTML = `
			<div class="no-movies">
				<p>Unable to find what you’re looking for. Please try another search.</p>
			</div>
		`
	}

}
