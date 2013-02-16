if (Meteor.isServer) {
  Meteor.methods({
    checkDb: function (trackName, artistName) {
      if (localLibrary.findOne({trackName: trackName, artistName: artistName }) === undefined) { //
        echoNest(word)
      } else {
        // query database
      }
    }
  });
}

function echoNest(word) {
  // var url = "http://api.echoNest.com//v4/word.json/" + word + "/definitions?includeRelated=false&includeTags=false&useCanonical=false&api_key=d103d202714dcea7f420d0d9ca90ddc01f1203225c8df91b6";
  results = Meteor.http.call("GET", url);
  echoNestEntry = results.content;
  echoNestParsed = JSON.parse(echoNestEntry);
  json = {word: word, entry: echoNestParsed[0]["text"]};
  localLibrary.insert(json)
}
