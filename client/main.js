trackName = "Kid A"; // set up to return from a clickhandler
artistName = "Radiohead";
Meteor.call("checkDb", trackName, artistName);