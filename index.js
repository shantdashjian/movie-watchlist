import {renderMovies, apiKey, baseUrl, movies} from './utils'

const inputElement = document.getElementById('search-input')

inputElement.addEventListener('keydown', event => {
	if (event.key === 'Enter') {
		showSearchResults()
	}
})

window.showSearchResults = async function () {
	const title = inputElement.value;
	try {
		const data = await fetchSearchResultsData(title);
		inputElement.value = ''
		if (data.Response == 'True') {
			const imdbIDs = data.Search.map(movie => movie.imdbID)
			renderMovies(imdbIDs);
		} else {
			movies.innerHTML = `
			<div class="no-movies flex column">
				<p>Unable to find what you’re looking for. Please try another search.</p>
			</div>
		`
		}
	} catch (error) {
		movies.innerHTML = `
			<div class="no-movies flex column">
				<p>Something went wrong with your request.</p>
			</div>
		`
	}
}

async function fetchSearchResultsData(title) {
	const response = await fetch(`${baseUrl}/?s=${title}&apikey=${apiKey}`)
	return await response.json()
}

window.addToWatchlist = function (event) {
	const imdbID = event.target.dataset.imdbId
	localStorage.setItem(imdbID, imdbID)
}
