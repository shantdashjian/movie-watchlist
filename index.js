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
	const titles = data.Search.map(movie => movie.Title)
	movies.innerHTML = ''
	titles.forEach(title => {
		fetch(`${baseUrl}/?t=${title}&apikey=${apiKey}`)
			.then(res => res.json())
			.then(result => {
				movies.innerHTML += `
					<div class="movie">
						<img src="${result.Poster}" alt="${result.Title}">
						<h3>${result.Title}</h3>
						<p>${result.imdbRating}</p>
						<p>${result.Runtime}</p>
						<p>${result.Genre}</p>
						<p>${result.Plot}</p>
					</div>
			`
			})
	})
}
