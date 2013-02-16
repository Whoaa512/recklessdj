
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
      console.log(JSON.stringify(FPFile));
    },
    function(FPError){
      console.log(FPError.toString());
    }
  );
}

