

var file;
filepicker.setKey("AgsF6GExRRJejABwf1FSpz");

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

Meteor.startup(function(){
  (function( $ ) {
    $.fn.niceFileField = function() {
      this.each(function(index, file_field) {
        file_field = $(file_field);
        var label = file_field.attr("data-label") || "Choose File";

        file_field.css({"display": "none"});
        file_field.after("<div class=\"span6 nice_file_field input-append\"><input class=\"input span6\" type=\"text\"><a class=\"btn\">" + label + "</a></div>");

        var nice_file_field = file_field.next(".nice_file_field");
        nice_file_field.find("a").click( function(){ file_field.click() } );
        file_field.change( function(){
          if(file_field[0].files.length > 1){
            nice_file_field.find("input").val(file_field[0].files.length + " files uploaded")
          } else{
            nice_file_field.find("input").val(file_field[0].files[0].name)
          }
        });
      });
    };
  })( jQuery );
  $("#document_field").niceFileField();
})
