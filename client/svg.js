function draw () {
	var svg = d3.select('svg');
	svg.append('defs').append('clipPath').attr('id','clip')
	.append('rect').attr('width', 950) .attr('height', innerHeight);
  var g = svg.append('g').attr('clip-path','url(#clip)')
	var rand = d3.random.normal(0, .2)
  var data = d3.range(100)
		.map(rand)
	var xscale = d3.scale.linear()
		.domain([0, 100])
		.range([0, document.querySelector('svg').offsetWidth])

	var yscale = d3.scale.linear()
		.domain([-1, 1])
		.range([300, 0])
	
	var line = d3.svg.line().interpolate('step-before')
		.x(function (d,i){ return x.scale(i) })
		.y(function (d){ return yscale(d) })

	var query = Playlist.find().fetch().filter(function (d){
																							 return d.duration && d.url
																						 })
	var props = 	['energy' ];

	var illustrate = function (d,i ) {
		var m = _.pluck(query, d)
		var x = d3.scale.linear()
			.domain([0, m.length])
			.range([0, document.querySelector('svg').offsetWidth])
		var y = d3.scale.linear()
			.domain([d3.min(m), d3.max(m)])
			.range([0, document.querySelector('svg').offsetHeight])
		d3.select('svg').on('click', function () {
													var dx = x.copy().invert((d3.mouse(this)[0]))
													var dy = y.copy().invert((d3.mouse(this)[1]))
													var closest = Playlist.findOne({$where: function () {
																														return this[d] - _ < .01
																													}})
													console.log(closest)
			 })
	var l = d3.svg.line().interpolate('linear')
		.x(function (d, i) { return x(i) })
		.y(function (d) { return y(d) })
		var chart = g.append('path').datum(m).attr({
																		 fill: 'none',
																		 'stroke-width': 5,
																		 'opacity': .5,
																		 stroke: "hsl(" + Math.random() * 360 + ",100%,50%)",
																		 d:l
																	 })
		var update = function () {
			var m = _.pluck(this.results, d).filter(function (d ){ return d});
			x.domain([0, m.length])
			chart.datum(m).transition().duration(500)
				.attr('d',l)
		}
		Playlist.find({}).observe({
															added: update, changed: update, removed: update, moved: update
														})
	}
	props.forEach(illustrate);
	[].forEach(function (item, index) {
									var path = 	g.insert('path', '*')
										.datum(data).attr('d',line)
										.attr({
														fill: 'none',
														'stroke-width': 15,
														'opacity': .5,
														stroke: "hsl(" + Math.random() * 360 + ",100%,50%)",
														'class': item
													})
									update(item, (index + 5) * 10)
								})

	function update(selector, time) {
		data.push(rand())
		d3.select('.' + selector).datum(data)
			.attr('transform', null)
			.attr('d', l)
		.transition().duration(function () {
return 														 Math.random() * time * 5 + 10

}).delay(function () { return Math.random () * 20 })
			.ease('linear')
			.attr('transform','translate(' + xscale(-1) + ')' )
			.each('end', update.bind(null, selector, time))
		data.shift()
	}
}
Meteor.setTimeout(draw, 500);