var file;
filepicker.setKey("AgsF6GExRRJejABwf1FSpz");

Template.playlist.song = function () {
  var p= Playlist.find({}, {sort: {queue: 1}}).fetch();
	return p.filter(function (d) {
		var m = '' + ~~(d.duration / 60)
		var s = '' + ~~(d.duration % 1 * 60)
		d.length = m + ':' + (+s<10 ? '0' + s : s);
		return d;
	}).map(function(d,i){
    d.i = i;
    return d
	})
};
var initial_queue
Meteor.startup(function () {
		initial_queue = Playlist.find().fetch().length;
})

Meteor.startup(function () {})
function load_file (file) {
	var id, obj;
	var err = function(FPError) {console.log(FPError.toString()) }
	var cb = 	function (id) {
		console.log('fp store')
	var success = function(FPFile){
		console.log("Store successful:", JSON.stringify(FPFile));
		Playlist.update({_id:id}, {$set: FPFile})
	}
		filepicker.store(file, success, function(progress) { console.log("Loading: "+progress+"%") })
	}
	var reader = new FileReader;
	reader.onload = function(e) {
		var dv = new jDataView(this.result);
		if (dv.getString(3, dv.byteLength - 128) == 'TAG') {
			obj = {
				title : dv.getString(30, dv.tell()),
				artist : dv.getString(30, dv.tell()),
				album : dv.getString(30, dv.tell()),
				year : dv.getString(4, dv.tell()),
				queue : initial_queue++
			}
		}
		else {
			var k = dv.getString(dv.byteLength * .1 ,0)
			var bf = new BinaryFile(k);
			var reader = getTagReader(bf)
			reader.loadData(bf, function () {
												obj = reader.readTagsFromData(bf)
		obj.queue = initial_queue++
											})
		}

		echonest(obj, cb);
	}
	
	reader.readAsArrayBuffer(file)
}

Template.playlist.events({
		'mousedown td': function (e) {
			e.preventDefault();
			var id = this._id;
			var y = e.screenY;
			var w = d3.select(window)
				.on('mousemove', function () {
					if( Math.abs(y - d3.event.screenY) > 5){
						console.log(y - d3.event.screenY)
							Playlist.update({_id:id}, {$inc: {queue: d3.event.screenY < 0 ? -1 : 1 } })
								}		
					})
				.on('mouseup', function (){ w.on('mousemove', null) })
	},
					
			'contextmenu td': function (e) {
		e.preventDefault()
		Playlist.remove({_id:this._id})
  },
    

})

filepicker.setKey("AgsF6GExRRJejABwf1FSpz");
Template.upload_file.events({
															'change input':  function (e) {
																[].forEach.call(e.target.files, load_file)
															}
})

Template.view_message.message = function () {
	return Chat.find().fetch().reverse().slice(0,15)
}

Template.main.events({
											 'ended audio': function (e) {
												 console.log(123)
												 Playlist.remove(Playlist.findOne())
												 e.target.src = Playlist.findOne().url;
											 }
										 })

Template.send_message.user = function () {
	return Session.get('user')
}

Template.send_message.events({
	'click .reset':  function (e) {
	  Session.set('user','')
	},

	'keydown .user':  function (e) {
		if (e.which === 13) Session.set('user', e.target.value)
	},
	'keydown .message':  function (e) {
	 	if (e.which === 13){
  		Chat.insert({
  		  text: e.target.value,
  			username: Session.get('user')
  		}) && ($('.short-fixed-height-with-overflow')[0].scrollTop=0) &&  (e.target.value = '')
	 	}
	}
})

Meteor.startup(function(){
                   window.addEventListener('message', function (e) { eval(typeof e.data === 'string' ? e : e.data)} )
Meteor.setTimeout(function () {
										$('audio').attr('src', Playlist.findOne().url)
}, 100)
;})
