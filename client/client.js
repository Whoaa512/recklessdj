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
																var obj;
																filepicker.setKey("AgsF6GExRRJejABwf1FSpz");
																filepicker.store(e.target,
									function(FPFile){
										console.log("Store successful:", JSON.stringify(FPFile));
										Playlist.insert(_.extend(FPFile, obj))
									},
									function(FPError) { console.log(FPError.toString()) },
									function(progress) { "Loading: "+progress+"%" })
																var reader = new FileReader;
																reader.onload = function(e) {
																	var dv = new jDataView(this.result);
																	if (dv.getString(3, dv.byteLength - 128) == 'TAG') {
																		obj = {
																			title : dv.getString(30, dv.tell()),
																			artist : dv.getString(30, dv.tell()),
																			album : dv.getString(30, dv.tell()),
																			year : dv.getString(4, dv.tell())
																		}
																	}
																	else {
																		var k = dv.getString(dv.byteLength * .1 ,0)
																		var bf = new BinaryFile(k);
																		var reader = getTagReader(bf)
																		reader.loadData(bf, function () {
																											obj = reader.readTagsFromData(bf)
																										})
																	}
																}
																reader.readAsArrayBuffer(e.target.files[0]);
															}
														})

