function echonest (obj, cb) {
	echoNestApiCall(obj, cb);
}

function echoNestApiCall(obj, cb) {
  var revsApiKey = "SPKJOSP5JJEXZ9I7W"
  var formattedTrackName = createFormattedName(obj.title);
  var formattedArtistName = createFormattedName(obj.artist);
  //   var url = "http://developer.echonest.com/api/v4/song/search?api_key=" + revsApiKey + "&format=json&results=1&combined=" + combined + "&rank_type=familiarity&bucket=audio_summary";/docs/v4/song.html#search
  var url = "http://developer.echonest.com/api/v4/song/search?api_key=" + revsApiKey + "&format=json&results=1&artist=" + formattedArtistName + "&title=" + formattedTrackName + "&sort=song_hotttnesss-desc&bucket=audio_summary"; //  match format 'karma%20police'    http://developer.echonest.com/docs/v4/song.html#search
  Meteor.http.call("GET", url, function(err, results) {
										 var id;
									   console.log(results)
										 results.data.response.songs.length  &&
											 (id = Playlist.insert( _.extend(obj, results.data.response.songs[0].audio_summary)))
											 && cb(id)
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

//
