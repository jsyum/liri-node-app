//Add code to read and set any environment variables with the dotenv package
// require("dotenv").config();
//Add the code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

// Include the axios npm package
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
moment().format();
// var dotenv = require("dotenv").config();
var Spotify = require("node-spotify-api");
// console.log("keys: %j", keys.spotify);
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
    case "do-what-it-says":
      doThis();
      break;
    default:
      console.log(
        "\n\nSorry that's not a valid search query!\nInstead try...\n\nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says\n\n...followed by your query\n\n"
      );
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
    console.log(
      "\n\nTitle: " +
        response.data.Title +
        "\nRelease Year: " +
        response.data.Year +
        "\nIMDB Rating: " +
        response.data.imdbRating +
        "\nRotten Tomatoes Rating: " +
        response.data.Ratings[1].Value +
        "\nCountry: " +
        response.data.Country +
        "\nLanguage: " +
        response.data.Language +
        "\nPlot: " +
        response.data.Plot +
        "\nActors: " +
        response.data.Actors +
        "\n\n"
    );
  });
}

function spotifyThis() {
  if (!userQuery) {
    userQuery = "The Sign Ace of Base";
  }
  spotify
    .search({ type: "track", query: userQuery, limit: 1 })
    .then(function(response) {
      // console.log(response.tracks.items[0]);
      console.log(
        "\n\n\nArtist: " +
          response.tracks.items[0].album.artists[0].name +
          "\nSong name: " +
          response.tracks.items[0].name +
          "\nPreview Url: " +
          response.tracks.items[0].preview_url +
          "\nAlbum name: " +
          response.tracks.items[0].album.name +
          "\n\n\n"
      );
    })

    .catch(function(err) {
      console.log(err);
    });
}

function concertThis() {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    userQuery +
    "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(function(response) {
    console.log(
      "\n\nVenue name: " +
        response.data[0].venue.name +
        "\nVenue location: " +
        response.data[0].venue.latitude +
        ", " +
        response.data[0].venue.longitude +
        "\n" +
        response.data[0].venue.city +
        "," +
        response.data[0].venue.region
    );
    var date = response.data[0].datetime;
    var format = "LLLL";
    console.log("Date of event: " + moment(date).format(format) + "\n\n");
  });
}

function doThis() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);
    console.log(dataArr[0]);
    userCommand = dataArr[0];
    userQuery = dataArr[1];
    fullRequest(userCommand);
  });
}
