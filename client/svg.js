
//Selects an element from a selection given an index
d3.selection.prototype.indexBy = function (index) {
	return d3.select(this[0][index]);
}

// Find the previous element in the selection
function prev (i) {
	return d3.selectAll('rect').indexBy(i-1).node() ? d3.selectAll('rect').indexBy(i-1).datum() : {width: 0, x:0}
}

//Given two objects swap the keys
function swap(from, to, val) {
	var swap = from[val];
	from[val] = to[val];
	to[val] = swap;
}

//This is the main function
function draw () {
	//Swap the position of two overlapping elements
	var snap = function (elem) {
		var data = elem.__data__;
		//todo: make the target is dynamic
		var target = d3.selectAll('rect').indexBy(data.position + 1);
		swap(target.datum(), data,'position'); // Swaps the positions of the target and the currently selected element
		update_position(target) // updating the position of the target

	}
  //Recomputes the width and the x-value
	function update_position(selection) {
		selection.attr({
			width: function (datum, index) { return datum.width = (datum.duration / total_duration) * innerWidth },
		  x: function (d,i) { return d.x = prev(d.position).width + prev(d.position).x }
		})
	}

	var svg = d3.select('svg');
  var g = svg.append('g')
	var query = Playlist.find().fetch()
	  .filter(function (d){ return d.duration && d.url })
  var total_duration = Playlist.find().fetch()
    .map(function (d) { return d.duration })
    .reduce( function (a,b) { return a + b })

	var illustrate = function (property) {
		var m = _.pluck(query, property) //rename
		var all_durations = _.pluck(query, 'duration')

		var x = d3.scale.linear()
			.domain([d3.min(all_durations), d3.max(all_durations)])
			.range([0, document.querySelector('svg').offsetWidth])

		var y = d3.scale.linear()
			.domain([0, 1])
			.range([600, 0])
		d3.select('svg').on('click', function () {
			return console.log('asdfasf')
			var dx = ~~x.copy().invert((d3.mouse(this)[0]))
			var dy = y.copy().invert((d3.mouse(this)[1]))
			var query = Playlist.find().fetch()
			var closest = q .filter(function (o) { return o[property] && o})
				.reduce(function (a,b) {
					return Math.abs(dy - a[property]) > Math.abs(dy - b[property]) ? b : a; 
								})
			var i = query.indexOf(closest)
			var swap = query[i];
			query[property] = q[dx]
			q[dx] = swap;
			var query = _.pluck(query, property).filter(function (d){ return d });
			x.domain([0, query.length])
		})
		var count = 0;
		var drag_node = d3.behavior.drag()
			.on('drag', function (d, i) {
					count += d3.event.dx;
					d3.select(this).attr('x', d3.mouse(d3.select(this).node())[0])
					if (count > d.width / 2) {
						count = 0
						snap(this)
					}
			})
			.on('dragend', function (d) { count = 0 })//Playlist.update({_id:d._id}, {$set: {track: 1}})
		var last;
		var nodes = g.selectAll('.node').data(query);
		var enter = nodes.enter().append('rect')
		enter
		.each(function (d, i) { return d.position = i})
		.call(drag_node)
		.attr({
			opacity: .5,
			fill: function () { return "hsl(" + Math.random() * 360 + ",100%,50%)"},
			height:function (d,i) {return 600 - y(d[property]) },
			y: function (datum) { return y(datum[property]) },		
		})
		.call(update_position)
		//.on('mouseover', function (d) { console.log(d.position, d.x)})

	}
illustrate('energy')
}
Meteor.setTimeout(draw, 500);