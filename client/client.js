Template.search.events({
												'keydown .search' : function (e) {
													if (e.which !== 13) return;
													console.log('searching for %s', e.target.value);
													e.target.value = '';
												}
											});

Template.playlist.songs = function () {
  return songs.find().fetch();
};