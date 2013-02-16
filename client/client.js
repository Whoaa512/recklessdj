  Template.hello.greeting = function () {
    return "Welcome to dj.";
  };

  Template.hello.events({
    '.search' : function (e) {
	if (e.which === 13) console.log('searching for %s', e.target.value)
  });
