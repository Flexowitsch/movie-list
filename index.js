const searchButton = document.getElementById("searchButton")
const userSearch = document.getElementById("userSearch")
const startImage = document.getElementById("startImage")
const resultsContainer = document.getElementById("resultsContainer")

const errorMessageSearch = document.getElementById("errorMessageSearch")

// trigger the search
searchButton.addEventListener("click", handleSearch)

// initializing the variable for the api call response
let response
let data

async function handleSearch(event) {
  event.preventDefault() 
  clearResults()
  startImage.style.display = "none"
  //updating the variables for the response
  response = await fetch(`https://www.omdbapi.com/?apikey=22994897&s=${userSearch.value}&page=1-100`)
  data = await response.json()
  console.log(data)
  // building the search results
  buildResults(data)
} 

async function buildResults(data) {
  console.log(data);
  let searchResults = data.Search;
  for (let i = 0; i < searchResults.length; i++) {
    const movieDetails = await fetchMovieDetails(searchResults[i].imdbID);
    const article = document.createElement("article");
    article.classList.add("flex");
    resultsContainer.appendChild(article);

    const img = document.createElement("img");
    img.src = searchResults[i].Poster;
    img.alt = searchResults[i].Title;
    article.appendChild(img);

    const informationContainer = document.createElement("div");
    informationContainer.classList.add("informationContainer");
    article.appendChild(informationContainer);

    const title = document.createElement("div");
    title.classList.add("title");
    informationContainer.appendChild(title);

    const movieTitle = document.createElement("p");
    movieTitle.classList.add("movieTitle");
    movieTitle.textContent = searchResults[i].Title;
    title.appendChild(movieTitle);

    const rating = document.createElement("div");
    rating.classList.add("rating", "flex");
    title.appendChild(rating);

    const star = document.createElement("img");
    star.classList.add("star");
    star.src = "./assets/rating.png";
    rating.appendChild(star);

    const ratingValue = document.createElement("p");
    ratingValue.classList.add("ratingValue");
    ratingValue.textContent = `${movieDetails.imdbRating}/10`;
    rating.appendChild(ratingValue);

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movieInfo");
    informationContainer.appendChild(movieInfo);

    const shortInfo = document.createElement("div");
    shortInfo.classList.add("shortInfo", "flex");
    movieInfo.appendChild(shortInfo);

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("infoContainer", "flex");
    shortInfo.appendChild(infoContainer);

    const duration = document.createElement("p");
    duration.classList.add("duration");
    duration.textContent = movieDetails.Runtime;
    infoContainer.appendChild(duration);

    const genre = document.createElement("p");
    genre.classList.add("genre");
    genre.textContent = movieDetails.Genre;  
    infoContainer.appendChild(genre);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button");
    shortInfo.appendChild(buttonContainer);

    const watchlistButton = document.createElement("img");
    watchlistButton.src = "./assets/add.png";
    watchlistButton.alt = "Add to Watchlist";
    buttonContainer.appendChild(watchlistButton);

    const watchlistText = document.createElement("p");
    watchlistText.textContent = "Watchlist";
    buttonContainer.appendChild(watchlistText);

    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = movieDetails.Plot;
    movieInfo.appendChild(description);
  }
}

// helper function to get additional IMDB movie details
async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=22994897&i=${imdbID}`);
    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      console.log("Error fetching movie details:", data.Error);
      return null;
    }
  } catch (error) {
    console.log("Network error:", error);
    return null;
  }
}

function clearResults() {
  const resultsContainer = document.getElementById('resultsContainer');
      const articles = resultsContainer.querySelectorAll('article');
      articles.forEach(article => {
          article.remove(); 
      });
 } 

