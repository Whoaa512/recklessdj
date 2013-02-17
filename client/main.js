trackName = "south of heaven"; // set up to return from a clickhandler
artistName = "slayer";

checkDb(trackName, artistName)

function checkDb(trackName, artistName) {
  // if (library.findOne({trackName: trackName, artistName: artistName }) === undefined) { //
    echoNestApiCall(trackName, artistName)
  // } else {
    // return collection database
// }
}

function echoNestApiCall(trackName, artistName) {

  // http://developer.echonest.com/api/v4/song/search?api_key=SPKJOSP5JJEXZ9I7W&format=json&artist=Ann+Peebles&title=i+can't+stand+the+rain&sort=song_hotttnesss-desc
  // http://developer.echonest.com/api/v4/song/search?api_key=SPKJOSP5JJEXZ9I7W&format=json&artist=the+xx&title=our+song&sort=artist_familiarity-desc&bucket=audio_summary
  // http://developer.echonest.com/api/v4/song/search?api_key=SPKJOSP5JJEXZ9I7W&format=json&artist=timmy+thomas&title=why+can't+we+live+together&sort=artist_familiarity-desc&bucket=audio_summary
  // http://developer.echonest.com/api/v4/song/search?api_key=SPKJOSP5JJEXZ9I7W&format=json&artist=kryptic+minds&title=the+talisman&sort=artist_familiarity-desc&bucket=audio_summary
  // http://developer.echonest.com/api/v4/song/search?api_key=SPKJOSP5JJEXZ9I7W&format=json&artist=shadow+child&title=string+thing&sort=artist_familiarity-desc&bucket=audio_summary
  // http://developer.echonest.com/api/v4/song/search?api_key=SPKJOSP5JJEXZ9I7W&format=json&artist=marley&title=jah+army&sort=artist_familiarity-desc&bucket=audio_summary
  // http://developer.echonest.com/api/v4/song/search?api_key=SPKJOSP5JJEXZ9I7W&format=json&artist=red+fang&title=wires&sort=artist_familiarity-desc&bucket=audio_summary
  // http://developer.echonest.com/api/v4/song/search?api_key=SPKJOSP5JJEXZ9I7W&format=json&artist=the+beatles&title=paperback+writer&sort=artist_familiarity-desc&bucket=audio_summary

  var revsApiKey = "SPKJOSP5JJEXZ9I7W"
  var formattedTrackName = createFormattedName(trackName);
  var formattedArtistName = createFormattedName(artistName);
  //   var url = "http://developer.echonest.com/api/v4/song/search?api_key=" + revsApiKey + "&format=json&results=1&combined=" + combined + "&rank_type=familiarity&bucket=audio_summary";/docs/v4/song.html#search
  var url = "http://developer.echonest.com/api/v4/song/search?api_key=" + revsApiKey + "&format=json&results=1&artist=" + formattedArtistName + "&title=" + formattedTrackName + "&sort=song_hotttnesss-desc&bucket=audio_summary"; //  match format 'karma%20police'    http://developer.echonest.com/docs/v4/song.html#search
  // format = works = http://developer.echonest.com/api/v4/song/search?api_key=SPKJOSP5JJEXZ9I7W&format=json&results=1&artist=radiohead&title=karma%20police&bucket=audio_summary
  Meteor.http.call("GET", url, function(err, results) {
console.log(url);
console.log("results = " + results);
  // db.update
  echoNestResponse = results.content;
console.log("echoNestResponse = " + echoNestResponse);
  echoNestParsed = JSON.parse(echoNestResponse);
console.log(echoNestParsed);
  var danceability = echoNestParsed['response.songs']['0']['audio_summary']["danceability"];
  var energy = echoNestParsed['response.songs']['0']['audio_summary']["energy"];
console.log(danceability);
  json = {trackName: trackName, artistName: artistName, danceability: danceability, energy: energy}; // , energy: echoNestParsed[0]["energy"], tempo: echoNestParsed[0]["tempo"]
console.log(json);
  library.insert(json);
  });
}

function createFormattedName(name) {
  var nameSplit = name.split(" ");
  var nameArray = [];
  var formattedName = "";
  for (var i = 0; i < nameSplit.length; i++) {
    nameArray.push(nameSplit[i]);
    if (i !== nameSplit.length - 1) {
      nameArray.push("+")
    }
  }
  nameArray.forEach(function(word) {
    formattedName += word;
  })
  return formattedName;
}
