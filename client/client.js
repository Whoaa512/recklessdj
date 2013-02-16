
Template.search.events({
												'keydown .search' : function (e) {
													if (e.which !== 13) return;
													console.log('searching for %s', e.target.value);
													e.target.value = '';
												}
											});

Template.playlist.song = function () {
  return Playlist.find().fetch();
};

function openFilePicker (){
  filepicker.setKey("AgsF6GExRRJejABwf1FSpz");
  filepicker.pick({
      services:['COMPUTER', 'DROPBOX', 'GMAIL', 'GOOGLE_DRIVE', 'URL'],
    },
    function(FPFile){
      var file = FPFile
    },
    function(FPError){
      console.log(FPError.toString());
    }
  );
}

// URL of the mp3 file (must be on the same domain!)
// var file = "something.mp3";
// define your own callback function
function mycallback() {
 // either call the ID3.getAllTags([file]) function which returns an object holding all the tags
 alert(
  "All tags in this file: " + ID3.getAllTags(file).toSource()
 );
 // or call ID3.getTag([file], [tag]) to get a specific tag
 alert(
  "Title: " + ID3.getTag(file, "title") + " by artist: " + ID3.getTag(file, "artist")
 );
}
ID3.loadTags(file, mycallback);
