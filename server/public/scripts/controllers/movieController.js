app.controller('MovieController', ['$scope', '$http', function ($scope, $http) {
  $scope.movies = [];
  $scope.currentMovie = {};
  $scope.displayedMovieId = '';
  $scope.newComment = {};

  getMovies();

  $scope.submitCurrentMovie = function () {
    var data = $scope.currentMovie;
    $http.post('/movies', data)
      .then(function () {
        console.log('POST /movies');
        getMovies();
      });
  };

  $scope.updateMovie = function (movie) {
    var movieId = movie._id;
    delete movie._id;
    $http.put('/movies/' + movieId, movie)
      .then(function (response) {
        console.log('PUT /movies ', movie);
        getMovies();
      });
  };

  $scope.deleteMovie = function (id) {
    $http.delete('/movies/' + id)
      .then(function (response) {
        console.log('DELETE /movies ', id);
        getMovies();
      });
  };

  $scope.showComments = function (id) {
    console.log('showComments', id);
    $scope.displayedMovieId = id;
  };

  $scope.submitComment = function (id) {
    // update the movie
    var comment = $scope.newComment;
    $http.put('/movies/' + id + '/comments', comment)
      .then(function (response) {
        console.log('PUT /comments ', comment);
        $scope.newComment = '';
        getMovies();
      });
  };

  function getMovies() {
    $http.get('/movies')
      .then(function (response) {
        response.data.forEach(function (movie) {
          movie.releaseDate = new Date(movie.releaseDate);
        });

        $scope.movies = response.data;
        console.log('GET /movies ', response.data);

      });
  }
}]);
