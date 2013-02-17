function echonest (id, obj) {
	echoNestApiCall(id, obj.title, obj.artist);
}

function echoNestApiCall(id, trackName, artistName) {
  var revsApiKey = "SPKJOSP5JJEXZ9I7W"
  var formattedTrackName = createFormattedName(trackName);
  var formattedArtistName = createFormattedName(artistName);
  var url = "http://developer.echonest.com/api/v4/song/search?api_key=" + revsApiKey + "&format=json&results=1&artist=" + formattedArtistName + "&title=" + formattedTrackName + "&sort=song_hotttnesss-desc&bucket=audio_summary"; //  match format 'karma%20police'    http://developer.echonest.com/docs/v4/song.html#search
  Meteor.http.call("GET", url, function(err, results) {
										 results.data.response.songs.length &&
										 Playlist.update({_id: id}, 	{$set:(results.data.response.songs[0].audio_summary)});
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
