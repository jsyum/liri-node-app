//Add code to read and set any environment variables with the dotenv package
// require("dotenv").config();
//Add the code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
// var dotenv = require("dotenv").config();
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//Take user command and specific query
var userCommand = process.argv[2];
var userQuery = process.argv.slice(3).join();

//App logic
function fullRequest(userCommand) {
  switch (userCommand) {
    case "concert-this":
      concertThis();
      break;
    case "spotify-this-song":
      spotifyThis();
      break;
    case "movie-this":
      movieThis();
      break;
    default:
      console.log("Not a valid search query");
      break;
  }
}

fullRequest(userCommand);

function movieThis() {
  if (!userQuery) {
    userQuery = "mr nobody";
  }

  var queryUrl =
    "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(function(response) {
    // console.log(response);
    // console.log(response.data.Ratings[1].Source);
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  });
}

function spotifyThis() {
  if (!userQuery) {
    userQuery = "The Sign Ace of Base";
  }
  spotify
    .search({ type: "track", query: userQuery, limit: 1 })
    .then(function(response) {
      //   console.log(response.tracks.items);
      console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
      console.log("Song name: " + response.tracks.items[0].name);
      console.log("Preview Url: " + response.tracks.items[0].preview_url);
      console.log("Album name: " + response.tracks.items[0].album.name);
    })

    .catch(function(err) {
      console.log(err);
    });
}
