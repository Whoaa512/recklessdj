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
		.range([0, innerWidth / 5])

	var yscale = d3.scale.linear()
		.domain([-1, 1])
		.range([300, 0])
	
	var line = d3.svg.line().interpolate('linear')
		.x(function (d,i){ return xscale(i) })
		.y(function (d){ return yscale(d) })
	var path = 	g.insert('path', '*')
		.datum(data).attr('class','line').attr('d',line)
		.attr({
						fill: 'none',
						'stroke-width': 2,
						stroke: 'red'
					});

	(function x() {
		 data.push(rand())
		 path.datum(data)
			 .attr('transform', null)
			 .attr('d', line)
			 .transition().duration(100)
			 .ease('linear')
			 .attr('transform','translate(' + xscale(-1) + ')' )
			 .each('end', x)
			data.shift()
	 })()
}
Meteor.startup(draw);