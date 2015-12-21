$(document).ready(function(){
	var options = {
		autoPlay: true,
		autoPlayDelay: 6000,
		pauseOnHover: false,
		nextButton: true,
		prevButton: true,
		preloader: false,
		navigationSkipThreshold: 1000,
		fadeFrameWhenSkipped: false
	};
	var sequence = $("#sequence").sequence(options).data("sequence");
});