// To retrieve the data that will power this app, you'll need to send requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.
// Node-Spotify-API
// Axios - You'll use Axios to grab data from the
    // OMDB API (http://www.omdbapi.com)
    // Bands In Town API (http://www.artists.bandsintown.com/bandsintown-api)
// Moment
// DotEnv

//  GLOBAL VARIABLES AND CONSTANTS
//  //  Required Packages
const Spotify = require('node-spotify-api');
const Axios = require('axios');
const Moment = require('moment');
const Dotenv = require("dotenv").config();
const fs = require('fs');

//  //  General Use
const keys = require("./keys.js");
const input = process.argv;
let spotify = new Spotify(keys.spotify);

//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  FUNCTION DEFINITIONS
//  //  Parse first argument into a seperate string
const command = () => {
    return input[2];
}

//  //  Parse arguments after command into a single string
let getArgs = () => {
    return input.slice(3).join(" ");
}

//  //  Make an API call based on getArgs() value that returns concert information
//  //  Useage looks like: `node liri.js concert-this <artist/band name here>`
const concertThis = (arg) => {
    let artist = getArgs(arg);    // I can't figure out how to get data for artists that have more than one word in their names...
    // console.log(artist);       //  Used for Debugging
    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    console.log(queryUrl);

    //  //  This will search the Bands in Town Artist Events API for an artist and render the
    //  //  following information about each event to the terminal:
    Axios.get(queryUrl).then(function(response) {
        // Name of the venue/Venue location/Date of the Event
        // console.log(response.data[0]);   //  Used for Debugging
        for(let i = 0; i < response.data.length; i++) {
            let temp = response.data[i];
            console.log(i + 1);
            console.log("Venue Name:\t" + temp.venue.name + "\nLocation:\t" + temp.venue.city + ", " + temp.venue.region + "\nWhen:\t\t" + temp.datetime);
        }
    }).catch(function(err) {
        //  //  Used to display error codes as they come up
        if(err.response) {
            let error = err.response;
            console.log("\t\tData\n" + error.data);
            console.log("\t\tStatus\n" + error.status);
            console.log("\t\tHeaders\n" + error.headers);
        }
        else if(err.request) {
            console.log(err.request);
        }
        else {
            console.log("There was an error:\n" + err);
        }
    })
}

//  //  Make an API call based on getArgs() value that returns song information
//  //  Useage looks like: `node liri.js spotify-this-song <song name here>`
const spotifyThisSong = (arg) => {
    let song = getArgs();
    // let queryUrl = 
    // This will show the following information about the song in your terminal/bash window
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
        // If no song is provided then your program will default to "The Sign" by Ace of Base.
    // You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
        // The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:
        // Step One: Visit <https://developer.spotify.com/my-applications/#!/>
        // Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
        // Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
        // Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).
}

const movieThis = (arg) => {
    // movie-this
// node liri.js movie-this '<movie name here>'
    // This will output the following information to your terminal/bash window:
        // Title of the movie.
        // Year the movie came out.
        // IMDB Rating of the movie.
        // Rotten Tomatoes Rating of the movie.
        // Country where the movie was produced.
        // Language of the movie.
        // Plot of the movie.
        // Actors in the movie.
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    // If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
    // It's on Netflix!
    // You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.
}

const runText = (arg) => {
// do-what-it-says
// node liri.js do-what-it-says`
    // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        // It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
        // Edit the text in random.txt to test out the feature for movie-this and concert-this.
}

switch (command()) {
// Make it so liri.js can take in one of the following commands:
    // concert-this
    case 'concert-this':
        concertThis(getArgs());
        break;
    case 'spotify-this-song':
        spotifyThisSong(getArgs());
        break;
    }