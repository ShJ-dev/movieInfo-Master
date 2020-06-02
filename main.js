document.getElementById('movieSearch').onclick = function(e){
  e.preventDefault();
  var searchText = document.getElementById('movieInfo').value;
  console.log(searchText);
  showMovies(searchText);
};

function showMovies(searchText) {
  fetch('https://www.omdbapi.com/?apikey=aefdca0d&s=' + searchText)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let movies = data.Search;
      let output = ``;
      movies.forEach(function (movie) {
        output += `<div class="col-md-3">
                    <div class="well text-center">
                      <img src="${movie.Poster}">
                        <h3 style="color:#e5e4e2">${movie.Title}</h3>
                          <a onclick="movieSelected('${movie.imdbID}')" id="viewDetails" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                  </div>
        `;
      });
      document.getElementById('movies').innerHTML = output;
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId= sessionStorage.getItem('movieId');

  fetch('https://www.omdbapi.com/?apikey=aefdca0d&i=' + movieId)
  .then(function(response){
    console.log(response);
    return response.json();
  })
  .then(function(data){
    console.log(data);
    let movie=data;
    console.log(movie);

    let output =`
    <div id="movieDetails" class="row">
      <div class="col-md-4">
        <img src="${movie.Poster}" class="img-thumbnail">
      </div>
      <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
          <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
          <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
          <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
          <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
          <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
          <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="well">
        <h3 style="color:#c1264c">Plot</h3>
        <p style="color:white">${movie.Plot}</p>
        <hr>
        
        <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" id="imdb" class="btn " style="background-color:#ffdf00" ><b style="color:black">View IMDB</b></a>
        
        <a href="index.html" id="backToSearch" class="btn btn-default">Go Back To Search</a>
      </div>
    </div>
  `;
  document.getElementById('movie').innerHTML = output;
  })
}
