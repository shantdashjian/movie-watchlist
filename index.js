import Movie from './Movie'

const apiKey = '5e86fe7d'
const baseUrl = 'http://www.omdbapi.com'

async function fetchSearchResultsData() {
	const title = document.getElementById('search-input').value
	const response = await fetch(`${baseUrl}/?s=${title}&apikey=${apiKey}`)
	return await response.json()
}

window.showSearchResults = async function() {
	const movies = document.getElementById('movies')
	const data = await fetchSearchResultsData();
	if (data.Response == 'True') {
		const imdbIDs = data.Search.map(movie => movie.imdbID)
		movies.innerHTML = ''
		imdbIDs.forEach(imdbID => {
			fetch(`${baseUrl}/?i=${imdbID}&plot=full&apikey=${apiKey}`)
				.then(res => res.json())
				.then(result => {
					const movie = new Movie(result)
					movies.innerHTML += movie.getHTML(true)
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

window.addToWatchlist = function(event) {
	const imdbID = event.target.dataset.imdbId
	localStorage.setItem(imdbID, imdbID)
}
