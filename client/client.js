var file;
filepicker.setKey("AgsF6GExRRJejABwf1FSpz");
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
function load_file (file) {
	var id, obj;
	var success = function(FPFile){
		console.log("Store successful:", JSON.stringify(FPFile));
		Playlist.update({_id:id}, {$set: FPFile})
	}
	var err = function(FPError) { console.log(FPError.toString()) }
	filepicker.store(this, success, function(progress) { "Loading: "+progress+"%" })
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
		console.log(obj)
		id = Playlist.insert(obj)
		echonest(id, obj);
	}
	reader.readAsArrayBuffer(file)
}

filepicker.setKey("AgsF6GExRRJejABwf1FSpz");
Template.upload_file.events({
															'change input':  function (e) {
																[].forEach.call(e.target.files, load_file, e.target)
}
})

Template.chat.message = function () {
	return Chat.find().fetch().reverse()
}

Template.chat.user = function () {
	return Session.get('user')
}

Template.chat.events({

											 'click .reset':  function (e) {
												 Session.set('user','')
											 },

											 'keydown .user':  function (e) {
												 if (e.which === 13) Session.set('user', e.target.value)
											 },
											 'keydown .message':  function (e) {
												 if (e.which === 13)
													 Chat.insert({
																				 text: e.target.value,
																				 user: Session.get('user')
																			 }) && (e.target.value = '')
											 }
										 })