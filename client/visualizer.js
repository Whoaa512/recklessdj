var analyser, canvas, canvasContext, temp;
function rand(n) { return ~~ (Math.random() * n); }
var colors = '0123456789abcdef'.split('');
var rand_c = function () {
    return "#"  + colors[rand(16)] + colors[rand(16)] + colors[rand(16)];
};
count =  0;
var rect = function () {
  if (! this.length) return;
  var r = d3.select('.music').attr('transform',
                                   'translate('+ innerWidth /2 +
                                   ',' + innerHeight / 2 +
                                   ')'+ 'rotate(' + ++count + ')'
                                   )
                             .selectAll('rect').data(this);
  r.enter().append('rect')
           .attr({ fill:'blue',
                   stroke: rand_c,
                   'stroke-width':2,
                   transform: function (d,i) {
                     return 'rotate(' + i  + ') '
                   }
                });

  var sum = [].reduce.call(this, function (a,b){ return a + b; });
  r.attr({
           height: function (d) {return d},
           width: 1,
           y: sum / this.length
         });
};

var vis = ['rect'];
var setupWebAudio = function() {
  var audio = document.querySelector('audio');
  var audioContext = new webkitAudioContext();
  analyser = audioContext.createAnalyser();
  var source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  audio.play();
};
function draw() {
  freqByteData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freqByteData);
  freqByteData = [].filter.call(freqByteData, function (d, i) {
                                    return i > 10;
                                });
  window[vis[0]].call(freqByteData, canvasContext, canvas);
}
var init = function() {
  d3.select('svg').append('g').attr('class','music');
  setupWebAudio();
  d3.timer(draw);
};
// window.addEventListener('load', init, false);