function draw () {
	var svg = d3.select('svg');
	svg.append('defs').append('clipPath').attr('id','clip')
	.append('rect').attr('width', 950) .attr('height', innerHeight);
  var g = svg.append('g').attr('clip-path','url(#clip)')
	g.append('circle')
		.attr('r', 30)
		.attr('fill', d3.rgb('#de2340').darker(1))
		.attr('cx', 150)
		.attr('cy', 100)
	function y(i) {
		g.insert('circle', '*')
			.attr('fill', '#de2340')
			.attr('cx', 150)
			.attr('cy', 100)
			.attr('opacity', 1)
			.transition()
			.delay(500)
			.duration(1500)
			.ease('cubic')
			.attr({
							opacity: 0,
							r: 80
						})
			.each('end', y)
			.remove()
	}
	for (var i= -1; i < 10; i++) y(i)
	var rand = d3.random.normal(0, .2)
  var data = d3.range(100)
		.map(rand)
	var xscale = d3.scale.linear()
		.domain([0, 100])
		.range([0, innerWidth / 5])

	var yscale = d3.scale.linear()
		.domain([-1, 1])
		.range([innerHeight, -150])
	
	var line = d3.svg.line().interpolate('linear')
		.x(function (d,i){ return xscale(i) })
		.y(function (d){ return yscale(d) })
	var path = 	g.insert('path', '*')
		.datum(data).attr('class','line').attr('d',line)
		.attr({
						fill: 'none',
						'stroke-width': 2,
						stroke: '#333'
					});

	(function x() {
		 data.push(rand())
		 path.datum(data)
			 .attr('transform', null)
			 .attr('d', line)
			 .transition().duration(10)
			 .ease('linear')
			 .attr('transform','translate(' + xscale(-1) + ')' )
			 .each('end', x)
			data.shift()
	 })()
}
//Meteor.startup(draw);