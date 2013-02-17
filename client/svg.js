function draw () {
	var svg = d3.select('svg').append('g')
	svg.append('circle')
		.attr('r',100)
		.attr('fill', 'pink')
		.attr('cx', '200')
		.attr('cy', '100')
	var data
	data = d3.range(100).map(Math.random)
	var line = d3.svg.line().interpolate('linear')
		.x(function (d,i){ return i * innerWidth / 5})
		.y(function (d){ return d * 100})
	var path = 	svg.append('path')
		.datum(data).attr('class','line').attr('d',line)
		.attr({
						fill: 'none',
						stroke: 'grey'
					})
	Meteor.setInterval(function () {
											 data.push(Math.random())
											 data.shift()
											 path.datum(data)
												 .attr('d',line)
												 .attr('transform', null)
												 .transition()
												 .ease('cubic')
												 .attr('transform','translate(' + -200 + ')' )
										 }, 200)
}

//Meteor.startup(draw);