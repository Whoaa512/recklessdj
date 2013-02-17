var file;
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

Template.upload_file.events({
															'change input':  function (e) {
  filepicker.setKey("AgsF6GExRRJejABwf1FSpz");
 filepicker.store(e.target,
									function(FPFile){ console.log("Store successful:", JSON.stringify(FPFile)); },
									function(FPError) { console.log(FPError.toString()) },
									function(progress) { console.log("Loading: "+progress+"%") })
var reader = new FileReader;
 reader.onload = function(e) {
    var dv = new jDataView(this.result);

    // "TAG" starts at byte -128 from EOF.
    // See http://en.wikipedia.org/wiki/ID3
    if (dv.getString(3, dv.byteLength - 128) == 'TAG') {
      var title = dv.getString(30, dv.tell());
      var artist = dv.getString(30, dv.tell());
      var album = dv.getString(30, dv.tell());
      var year = dv.getString(4, dv.tell());
			console.log(title, artist, album, year)
    } else {
      // no ID3v1 data found.
    }
  };
  reader.readAsArrayBuffer(e.target.files[0]);
															}
														})

